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

if __name__ == '__main__':
    app.run(port=5000,debug=True)
