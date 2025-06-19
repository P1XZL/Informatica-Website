from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

# Sample data for demonstration
SAMPLE_MODS = [
    {
        "id": 1,
        "name": "OptiFine",
        "description": "Dramatically improves FPS and adds many graphics options",
        "author": "sp614x",
        "downloads": "150M+",
        "version": "1.20.4",
        "category": "optimization",
        "image": "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        "id": 2,
        "name": "JEI (Just Enough Items)",
        "description": "Item and recipe viewing mod for Minecraft",
        "author": "mezz",
        "downloads": "120M+",
        "version": "1.20.4",
        "category": "utility",
        "image": "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        "id": 3,
        "name": "Biomes O' Plenty",
        "description": "Adds over 80 unique biomes to enhance your world",
        "author": "Forstride",
        "downloads": "95M+",
        "version": "1.20.4",
        "category": "world-generation",
        "image": "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
]

SAMPLE_TEXTURES = [
    {
        "id": 1,
        "name": "Faithful 32x",
        "description": "Higher resolution textures that stay true to the original",
        "author": "Faithful Team",
        "downloads": "80M+",
        "resolution": "32x32",
        "image": "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        "id": 2,
        "name": "Sphax PureBDcraft",
        "description": "Cartoon-style texture pack with vibrant colors",
        "author": "Sphax",
        "downloads": "60M+",
        "resolution": "128x128",
        "image": "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
]

@app.route('/')
def index():
    return render_template("index.html", featured_mods=SAMPLE_MODS[:3])

@app.route('/mods')
def mods():
    category = request.args.get('category', 'all')
    search = request.args.get('search', '')
    
    filtered_mods = SAMPLE_MODS
    if category != 'all':
        filtered_mods = [mod for mod in SAMPLE_MODS if mod['category'] == category]
    if search:
        filtered_mods = [mod for mod in filtered_mods if search.lower() in mod['name'].lower() or search.lower() in mod['description'].lower()]
    
    return render_template("mods.html", mods=filtered_mods, current_category=category, search_query=search)

@app.route('/gallery')
def gallery():
    return render_template("gallery.html")

@app.route('/textures')
def textures():
    return render_template("textures.html", textures=SAMPLE_TEXTURES)

@app.route('/worlds')
def worlds():
    return render_template("worlds.html")

@app.route('/shaders')
def shaders():
    return render_template("shaders.html")

@app.route('/guides')
def guides():
    return render_template("guides.html")

@app.route('/upload')
def upload():
    return render_template("upload.html")

@app.route('/mod/<int:mod_id>')
def mod_detail(mod_id):
    mod = next((mod for mod in SAMPLE_MODS if mod['id'] == mod_id), None)
    if not mod:
        return "Mod not found", 404
    return render_template("mod_detail.html", mod=mod)

@app.route('/api/search')
def api_search():
    query = request.args.get('q', '')
    category = request.args.get('category', 'all')
    
    results = []
    for mod in SAMPLE_MODS:
        if query.lower() in mod['name'].lower() or query.lower() in mod['description'].lower():
            if category == 'all' or mod['category'] == category:
                results.append(mod)
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)