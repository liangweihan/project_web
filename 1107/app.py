from flask import Flask, render_template

app = Flask(__name__)

# 共同入口
@app.route('/')
def landing():
    return render_template('landing.html')

# 科技系網站
@app.route('/tahrd')
def tahrd_home():
    return render_template('index.html') # 科技系首頁

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

@app.route('/group3_1')
def group3_1():
    return render_template('group3_1.html')

@app.route('/group3_2')
def group3_2():
    return render_template('group3_2.html')

@app.route('/group4_1')
def group4_1():
    return render_template('group4_1.html')

@app.route('/group4_2')
def group4_2():
    return render_template('group4_2.html')

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

# 圖傳系網站
@app.route('/gac')
def gac_home():
    return render_template('gac/gac_index.html')

@app.route('/gac/group1')
def gac_group1():
    return render_template('gac/gac_group01.html')

@app.route('/gac/group2')
def gac_group2():
    return render_template('gac/gac_group02.html')

@app.route('/gac/group3')
def gac_group3():
    return render_template('gac/gac_group03.html')

@app.route('/gac/group4')
def gac_group4():
    return render_template('gac/gac_group04.html')

@app.route('/gac/group5')
def gac_group5():
    return render_template('gac/gac_group05.html')

@app.route('/gac/group6')
def gac_group6():
    return render_template('gac/gac_group06.html')

@app.route('/gac/group7')
def gac_group7():
    return render_template('gac/gac_group07.html')

@app.route('/gac/group8')
def gac_group8():
    return render_template('gac/gac_group08.html')

@app.route('/gac/group9')
def gac_group9():
    return render_template('gac/gac_group09.html')

@app.route('/gac/group10')
def gac_group10():
    return render_template('gac/gac_group10.html')

@app.route('/gac/group11')
def gac_group11():
    return render_template('gac/gac_group11.html')

@app.route('/gac/group12')
def gac_group12():
    return render_template('gac/gac_group12.html')

@app.route('/gac/group13')
def gac_group13():
    return render_template('gac/gac_group13.html')

@app.route('/gac/group14')
def gac_group14():
    return render_template('gac/gac_group14.html')

@app.route('/gac/group15')
def gac_group15():
    return render_template('gac/gac_group15.html')

@app.route('/gac_background')
def background_test():
    return render_template('gac/gac_background.html')

if __name__ == '__main__':
    app.run(port=5000,debug=True)
