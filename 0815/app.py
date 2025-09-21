from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/group1_1')
def group1_1():
    return render_template('group1_1.html')

@app.route('/group1_2')
def group1_2():
    return render_template('group1_2.html')

@app.route('/group2_1')
def group2_1():
    return render_template('group2_1.html')

@app.route('/group2_2')
def group2_2():
    return render_template('group2_2.html')

@app.route('/group5_1')
def group5_1():
    return render_template('group5_1.html')

@app.route('/group5_2')
def group5_2():
    return render_template('group5_2.html')

@app.route('/group6_1')
def group6_1():
    return render_template('group6_1.html')

@app.route('/group6_2')
def group6_2():
    return render_template('group6_2.html')

@app.route('/group7_1')
def group7_1():
    return render_template('group7_1.html')

@app.route('/group7_2')
def group7_2():
    return render_template('group7_2.html')

@app.route('/group8_1')
def group8_1():
    return render_template('group8_1.html')

@app.route('/group8_2')
def group8_2():
    return render_template('group8_2.html')

if __name__ == '__main__':
    app.run(port=5000,debug=True)
