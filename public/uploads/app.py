import os
from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from flask_sqlalchemy import SQLAlchemy
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_sqlalchemy import SQLAlchemy
import jwt
from functools import wraps
from werkzeug.utils import secure_filename
import smtplib
from email.mime.text import MIMEText
from twilio.rest import Client
import datetime

app = Flask(__name__)
# Restrict CORS to Production and Dev URLs
CORS(app, resources={r"/api/*": {"origins": ["https://novelenterprises.vercel.app", "http://localhost:5173"]}})
socketio = SocketIO(app, cors_allowed_origins=["https://novelenterprises.vercel.app", "http://localhost:5173"])

# Rate Limiting
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://"
)

# Database Configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///' + os.path.join(basedir, 'novel.db'))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'frontend', 'public', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

SECRET_KEY = "novel123_secret"

# Twilio Keys (Placeholders)
TWILIO_ACCOUNT_SID = os.environ.get('TWILIO_ACCOUNT_SID', 'AC_placeholder')
TWILIO_AUTH_TOKEN = os.environ.get('TWILIO_AUTH_TOKEN', 'token_placeholder')
TWILIO_PHONE_NUMBER = os.environ.get('TWILIO_PHONE_NUMBER', '+1234567890')
ADMIN_PHONE_NUMBER = os.environ.get('ADMIN_PHONE_NUMBER', '+918010562953')

active_users = 0

@socketio.on('connect')
def handle_connect():
    global active_users
    active_users += 1
    emit('live_count', {'count': active_users}, broadcast=True)

@socketio.on('disconnect')
def handle_disconnect():
    global active_users
    active_users = max(0, active_users - 1)
    emit('live_count', {'count': active_users}, broadcast=True)

def send_email_notification(lead_data):
    try:
        msg = MIMEText(f"New Lead: {lead_data.get('name')}\nPhone: {lead_data.get('phone')}\nEmail: {lead_data.get('email')}\nMessage: {lead_data.get('message')}")
        msg['Subject'] = 'New Quote Request - Novel Enterprises'
        msg['From'] = 'noreply@novelenterprises.com'
        msg['To'] = 'novelenterprises@gmail.com'
        # server = smtplib.SMTP('smtp.gmail.com', 587)
        # server.starttls()
        # server.login('your_email@gmail.com', 'your_password')
        # server.send_message(msg)
        # server.quit()
        print(f"Email notification prepared for: {lead_data.get('name')}")
    except Exception as e:
        print("Email error:", e)

def send_whatsapp_notification(lead_data):
    try:
        if TWILIO_ACCOUNT_SID != 'AC_placeholder':
            client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
            message = client.messages.create(
                body=f"🟢 Novel Enterprises Alert:\nNew Lead from {lead_data.get('name')}\nPhone: {lead_data.get('phone')}\nMessage: {lead_data.get('message')}",
                from_=f"whatsapp:{TWILIO_PHONE_NUMBER}",
                to=f"whatsapp:{ADMIN_PHONE_NUMBER}"
            )
            print(f"WhatsApp sent: {message.sid}")
        else:
            print(f"[Simulated] WhatsApp sent to admin for lead: {lead_data.get('name')}")
    except Exception as e:
        print("WhatsApp Error:", e)

# Models
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    subtitle = db.Column(db.String(200))
    placeholderText = db.Column(db.String(50))
    price = db.Column(db.Integer)
    category = db.Column(db.String(100))
    image_url = db.Column(db.String(200))

class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

class Inquiry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    location = db.Column(db.String(100))
    message = db.Column(db.Text)
    status = db.Column(db.String(20), default="Pending")
    date = db.Column(db.String(20))

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(100))
    contact_person = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    status = db.Column(db.String(20), default="Active")

class Gallery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    category = db.Column(db.String(50))
    image_url = db.Column(db.String(200))

class Brochure(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    file_url = db.Column(db.String(200))
    is_active = db.Column(db.Boolean, default=False)
    date_uploaded = db.Column(db.String(50))

class Setting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(50), unique=True)
    value = db.Column(db.String(200))

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if request.method == 'GET':
            return f(*args, **kwargs)
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing!'}), 401
        try:
            token = token.split(" ")[1]
            jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except:
            return jsonify({'error': 'Token is invalid!'}), 401
        return f(*args, **kwargs)
    return decorated

@app.route('/api/admin/login', methods=['POST'])
@limiter.limit("5 per minute")
def admin_login():
    data = request.json
    if data and data.get('username') == 'admin' and data.get('password') == 'novel123':
        # Token expires in 2 hours
        exp = datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        token = jwt.encode({'user': 'admin', 'exp': exp}, SECRET_KEY, algorithm="HS256")
        return jsonify({'token': token})
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/products', methods=['GET', 'POST'])
@token_required
def handle_products():
    if request.method == 'POST':
        req_json = request.json or {}
        name = request.form.get('name') or req_json.get('name')
        category = request.form.get('category') or req_json.get('category')
        price = request.form.get('price') or req_json.get('price') or 0
        description = request.form.get('description') or req_json.get('subtitle') or ''
        
        image_url = ""
        if 'image' in request.files:
            file = request.files['image']
            if file and file.filename != '':
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                image_url = f"/uploads/{filename}"

        new_product = Product(
            name=name, subtitle=description, placeholderText=name.split()[0] if name else "New",
            price=int(price), category=category, image_url=image_url
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify({"message": "Product added successfully!"}), 201
    
    products = Product.query.all()
    return jsonify([{"id": p.id, "name": p.name, "subtitle": p.subtitle, "placeholderText": p.placeholderText, "price": p.price, "category": p.category, "image_url": p.image_url} for p in products])

@app.route('/api/products/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@token_required
def handle_product(id):
    product = Product.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify({"id": product.id, "name": product.name, "subtitle": product.subtitle, "placeholderText": product.placeholderText, "price": product.price, "category": product.category, "image_url": product.image_url})
    if request.method == 'DELETE':
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Deleted successfully"}), 200
    if request.method == 'PUT':
        data = request.json
        product.name = data.get('name', product.name)
        product.subtitle = data.get('subtitle', product.subtitle)
        product.price = data.get('price', product.price)
        product.category = data.get('category', product.category)
        product.placeholderText = data.get('placeholderText', product.placeholderText)
        db.session.commit()
        return jsonify({"message": "Updated successfully"}), 200

@app.route('/api/services', methods=['GET', 'POST'])
@token_required
def handle_services():
    if request.method == 'POST':
        name = request.form.get('name') or request.json.get('name')
        new_service = Service(name=name)
        db.session.add(new_service)
        db.session.commit()
        return jsonify({"message": "Service added successfully!"}), 201
    services = Service.query.all()
    return jsonify([{"id": s.id, "name": s.name} for s in services])

@app.route('/api/services/<int:id>', methods=['PUT', 'DELETE'])
@token_required
def handle_service(id):
    service = Service.query.get_or_404(id)
    if request.method == 'DELETE':
        db.session.delete(service)
        db.session.commit()
        return jsonify({"message": "Deleted successfully"}), 200
    if request.method == 'PUT':
        data = request.json
        service.name = data.get('name', service.name)
        db.session.commit()
        return jsonify({"message": "Updated successfully"}), 200

@app.route('/api/dashboard-stats', methods=['GET'])
def get_stats():
    return jsonify({
        "total_products": Product.query.count(),
        "customer_inquiries": Inquiry.query.count()
    })

@app.route('/api/inquiries', methods=['GET'])
@token_required
def get_inquiries():
    inquiries = Inquiry.query.all()
    return jsonify([{"id": i.id, "name": i.name, "email": i.email, "phone": i.phone, "location": i.location, "message": i.message, "status": i.status, "date": i.date} for i in inquiries])

@app.route('/api/inquiries/<int:id>', methods=['PUT', 'DELETE'])
@token_required
def handle_inquiry(id):
    inq = Inquiry.query.get_or_404(id)
    if request.method == 'DELETE':
        db.session.delete(inq)
        db.session.commit()
        return jsonify({"message": "Deleted successfully"}), 200
    if request.method == 'PUT':
        data = request.json
        inq.status = data.get('status', inq.status)
        db.session.commit()
        return jsonify({"message": "Updated successfully"}), 200

@app.route('/api/customers', methods=['GET', 'POST'])
@token_required
def handle_customers():
    if request.method == 'POST':
        data = request.json
        new_cust = Customer(company=data.get("company"), contact_person=data.get("contact_person"), email=data.get("email"), phone=data.get("phone"))
        db.session.add(new_cust)
        db.session.commit()
        return jsonify({"message": "Customer added"}), 201
    customers = Customer.query.all()
    return jsonify([{"id": c.id, "company": c.company, "contact_person": c.contact_person, "email": c.email, "phone": c.phone, "status": c.status} for c in customers])

@app.route('/api/customers/<int:id>', methods=['DELETE'])
@token_required
def delete_customer(id):
    cust = Customer.query.get_or_404(id)
    db.session.delete(cust)
    db.session.commit()
    return jsonify({"message": "Deleted"}), 200

@app.route('/api/gallery', methods=['GET', 'POST'])
@token_required
def handle_gallery():
    if request.method == 'POST':
        title = request.form.get('title', 'New Image')
        category = request.form.get('category', 'General')
        image_url = "https://placehold.co/600x400/041f4a/fff?text=New+Image"
        if 'image' in request.files:
            file = request.files['image']
            if file and file.filename != '':
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                image_url = f"/uploads/{filename}"
        new_item = Gallery(title=title, category=category, image_url=image_url)
        db.session.add(new_item)
        db.session.commit()
        return jsonify({"message": "Image uploaded"}), 201
    gallery = Gallery.query.all()
    return jsonify([{"id": g.id, "title": g.title, "category": g.category, "image_url": g.image_url} for g in gallery])

@app.route('/api/gallery/<int:id>', methods=['DELETE'])
@token_required
def delete_gallery(id):
    g = Gallery.query.get_or_404(id)
    db.session.delete(g)
    db.session.commit()
    return jsonify({"message": "Deleted"}), 200

@app.route('/api/brochures', methods=['GET', 'POST'])
@token_required
def handle_brochures():
    if request.method == 'POST':
        title = request.form.get('title', 'New Brochure')
        file_url = ""
        if 'file' in request.files:
            file = request.files['file']
            if file and file.filename != '':
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                file_url = f"/uploads/{filename}"
        
        new_item = Brochure(title=title, file_url=file_url, date_uploaded=datetime.datetime.now().strftime("%Y-%m-%d"))
        
        # If no active brochure exists, make this one active
        if not Brochure.query.filter_by(is_active=True).first():
            new_item.is_active = True
            
        db.session.add(new_item)
        db.session.commit()
        return jsonify({"message": "Brochure uploaded"}), 201
    
    brochures = Brochure.query.all()
    return jsonify([{"id": b.id, "title": b.title, "file_url": b.file_url, "is_active": b.is_active, "date_uploaded": b.date_uploaded} for b in brochures])

@app.route('/api/brochures/<int:id>', methods=['DELETE', 'PUT'])
@token_required
def handle_brochure(id):
    b = Brochure.query.get_or_404(id)
    if request.method == 'DELETE':
        db.session.delete(b)
        db.session.commit()
        return jsonify({"message": "Deleted"}), 200
    if request.method == 'PUT':
        data = request.json
        if 'is_active' in data:
            if data['is_active']:
                # Set all others to inactive
                Brochure.query.update({Brochure.is_active: False})
            b.is_active = data['is_active']
        db.session.commit()
        return jsonify({"message": "Updated"}), 200

@app.route('/api/settings', methods=['GET', 'PUT'])
@token_required
def handle_settings():
    if request.method == 'PUT':
        data = request.json
        for k, v in data.items():
            setting = Setting.query.filter_by(key=k).first()
            if setting:
                setting.value = v
            else:
                db.session.add(Setting(key=k, value=v))
        db.session.commit()
        return jsonify({"message": "Settings updated successfully"}), 200
    
    settings = Setting.query.all()
    if not settings:
        default_settings = {
            "company_name": "Novel Enterprises",
            "phone": "+91 8010562953",
            "email": "novelenterprises@gmail.com",
            "address": "Plot No.A247, Five Star MIDC, Kagal, Kolhapur"
        }
        return jsonify(default_settings)
    return jsonify({s.key: s.value for s in settings})

@app.route('/api/track-visit', methods=['POST'])
def track_visit():
    visitor_setting = Setting.query.filter_by(key='total_visitors').first()
    if visitor_setting:
        visitor_setting.value = str(int(visitor_setting.value) + 1)
    else:
        visitor_setting = Setting(key='total_visitors', value='1')
        db.session.add(visitor_setting)
    db.session.commit()
    return jsonify({"message": "Visit tracked"}), 200

@app.route('/api/dashboard-stats', methods=['GET'])
@token_required
def dashboard_stats():
    total_products = Product.query.count()
    customer_inquiries = Inquiry.query.count()
    visitor_setting = Setting.query.filter_by(key='total_visitors').first()
    total_visitors = int(visitor_setting.value) if visitor_setting else 0
    return jsonify({
        "total_products": total_products,
        "customer_inquiries": customer_inquiries,
        "total_visitors": total_visitors
    }), 200

@app.route('/api/quote', methods=['POST'])
@limiter.limit("5 per minute")
def submit_quote():
    data = request.json
    if not data or not data.get('email'):
        return jsonify({"error": "Invalid data"}), 400
    
    new_inquiry = Inquiry(
        name=data.get("name"),
        email=data.get("email"),
        phone=data.get("phone"),
        location=data.get("location"),
        message=data.get("message"),
        date=datetime.datetime.now().strftime("%Y-%m-%d")
    )
    db.session.add(new_inquiry)
    db.session.commit()
    
    send_email_notification(data)
    send_whatsapp_notification(data)
    
    return jsonify({"message": "Quote submitted successfully"}), 201

def init_db():
    with app.app_context():
        db.create_all()
        # Seed initial settings if empty
        if not Setting.query.first():
            defaults = [
                Setting(key="company_name", value="Novel Enterprises"),
                Setting(key="phone", value="+91 8010562953"),
                Setting(key="email", value="novelenterprises@gmail.com"),
                Setting(key="address", value="Plot No.A247, Five Star MIDC, Kagal, Kolhapur")
            ]
            db.session.bulk_save_objects(defaults)
            db.session.commit()

        # Seed initial products if empty
        if not Product.query.first():
            initial_products = [
                Product(name="Forklift", subtitle="High capacity forklift", placeholderText="Forklift", price=1200000, category="Lifting Equipment", image_url="/images/forklift.png"),
                Product(name="Electric Stacker", subtitle="Efficient warehouse stacker", placeholderText="Stacker", price=450000, category="Stackers", image_url="/images/stacker.png"),
                Product(name="Semi Electric", subtitle="Medium load stacker", placeholderText="Semi", price=250000, category="Stackers", image_url="/images/stacker.png"),
                Product(name="Pallet Trucks", subtitle="Durable daily operations", placeholderText="Pallet", price=18000, category="Manual Handling", image_url="/images/pallet.png"),
                Product(name="Scissor Lift Tables", subtitle="Versatile lift tables", placeholderText="Scissor", price=150000, category="Lifting Equipment", image_url="/images/scissor.png"),
                Product(name="Drum Handling", subtitle="Safe handling equipment", placeholderText="Drum", price=35000, category="Manual Handling", image_url="/images/drum.png"),
                Product(name="Goods Lifts", subtitle="Heavy duty vertical lifts", placeholderText="Goods", price=850000, category="Lifting Equipment", image_url="/images/goods_lift.png")
            ]
            db.session.bulk_save_objects(initial_products)
            db.session.commit()
            
        # Seed initial services if empty
        if not Service.query.first():
            initial_services = [
                Service(name="Forklift Sale, Diesel & Electrical"),
                Service(name="Service Provider"),
                Service(name="Welding Structure"),
                Service(name="SS Pipe Line")
            ]
            db.session.bulk_save_objects(initial_services)
            db.session.commit()

if __name__ == '__main__':
    init_db()
    socketio.run(app, debug=True, port=5000)
