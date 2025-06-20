from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("/index.html")


@app.route('/mods')
def mods():
    return render_template("/mods.html")


@app.route('/gallery')
def gallery():
    return render_template("/gallery.html")


@app.route('/textures')
def textures():
    return render_template("/textures.html")


@app.route('/worlds')
def worlds():
    return render_template("/worlds.html")


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
