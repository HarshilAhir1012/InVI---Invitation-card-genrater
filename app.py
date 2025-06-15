from flask import Flask, render_template, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__, static_folder='.')
CORS(app)

# Theme configurations
THEMES = {
    'gradient-purple': {
        'background': 'linear-gradient(135deg, #6e45e2 0%, #89d4cf 100%)',
        'textColor': '#ffffff',
        'accentColor': '#ffffff'
    },
    'elegant-gold': {
        'background': 'linear-gradient(135deg, #b8860b 0%, #daa520 100%)',
        'textColor': '#ffffff',
        'accentColor': '#ffd700'
    },
    'ocean-blue': {
        'background': 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        'textColor': '#ffffff',
        'accentColor': '#4fc3f7'
    }
}

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/invi.html')
def create_invitation():
    return send_from_directory('.', 'invi.html')

@app.route('/api/themes', methods=['GET'])
def get_themes():
    return jsonify({
        'success': True,
        'themes': THEMES
    })

@app.route('/api/templates', methods=['GET'])
def get_templates():
    return jsonify(TEMPLATES)

@app.route('/api/generate', methods=['POST'])
def generate_invitation():
    data = request.json
    
    # Basic validation
    required_fields = ['eventType', 'hostName', 'eventDate', 'eventTime', 'venue', 'templateId']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        # Format the date
        date_obj = datetime.strptime(data['eventDate'], '%Y-%m-%d')
        formatted_date = date_obj.strftime('%B %d, %Y')
        
        # Format the time
        try:
            time_obj = datetime.strptime(data['eventTime'], '%H:%M')
            formatted_time = time_obj.strftime('%I:%M %p')
            data['formattedTime'] = formatted_time
        except ValueError:
            data['formattedTime'] = data['eventTime']
        
        # Get theme data
        theme_name = data.get('template', 'gradient-purple')
        theme = THEMES.get(theme_name, THEMES['gradient-purple'])
        data['theme'] = theme
        
        # Here you could save the invitation to a database or generate a PDF
        # For now, we'll just return the data
        
        return jsonify({
            'success': True,
            'message': 'Invitation generated successfully!',
            'data': data
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error generating invitation: {str(e)}'
        }), 500

@app.route('/<path:path>')
def serve_static(path):
    # Handle root path
    if path == '':
        return send_from_directory('.', 'index.html')
    
    # Try to serve the file if it exists
    if os.path.exists(path):
        return send_from_directory('.', path)
    
    # For SPA routing, serve index.html for any other path
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    # Create uploads directory if it doesn't exist
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    
    # Run the app
    app.run(debug=True, port=5000)
