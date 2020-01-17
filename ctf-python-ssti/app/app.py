import os
from flask import Flask, request, render_template, render_template_string, redirect, url_for, make_response
from jinja2 import Environment
import decrypt

app = Flask(__name__)
Jinja2 = Environment()

def reset_cookie(referrer):
	if(referrer):
		resp = make_response(redirect(referrer + '?err=True'))
		resp.set_cookie('sacrifice','a',expires=0)
		return resp
	else:
		resp = make_response(redirect('/?err=True'))
		resp.set_cookie('sacrifice','a',expires=0)
		return resp

@app.route('/', methods = ['GET', 'POST'])
def index():
	if(request.args.get('err') == 'True'):
		print('Error: True')
		error_chk = True
	else:
		print('Error: False')
		error_chk = False
	
	cook = {}
	
	if(request.cookies.get('sacrifice')):
		if(decrypt.check_decrypt(request.cookies.get('sacrifice'))):
			cook['sacrifice'] = decrypt.check_decrypt(request.cookies.get('sacrifice')).decode('utf-8')
			cook['ssti'] = Jinja2.from_string(cook['sacrifice']).render()
		else:
			print('Resetting cookies.')
			return reset_cookie(False)
	
	return render_template("index.html", error_check=error_chk, cookies = cook) #, name=Jinja2.from_string(ssti).render() , title=Jinja2.from_string(ssti).render()

@app.route('/sacrifice', methods=['GET','POST'])
def sacrifice():
	if(request.args.get('err') == 'True'):
		print('Error: True')
		error_chk = True
	else:
		print('Error: False')
		error_chk = False

	cook = {}

	if(request.cookies.get('sacrifice')):
		if(decrypt.check_decrypt(request.cookies.get('sacrifice'))):
			cook['sacrifice'] = decrypt.check_decrypt(request.cookies.get('sacrifice')).decode('utf-8')
			cook['ssti'] = Jinja2.from_string(cook['sacrifice']).render()
		else:
			print('Resetting cookies.')
			return reset_cookie(False)
	else:
		return reset_cookie(False)

	return render_template("sacrifice.html", error_check=error_chk, cookies=cook)

@app.route('/robots.txt', methods=['GET','POST'])
def robots():
	return open('robots.txt','r').read()

@app.route('/HELP-ME-91d0fb192584c352.html', methods=['GET','POST'])
def help_me():
	return open('HELP-ME-91d0fb192584c352.html','r').read()

@app.route('/submit', methods=['GET','POST'])
def submit():
	print(request.referrer)
	if(request.form['sacrifice']):
		if(decrypt.check_decrypt(request.form['sacrifice'])):
			resp = make_response(redirect('/'))
			resp.set_cookie('sacrifice', request.form['sacrifice'])
			return resp
		else:
			return reset_cookie(request.referrer)
	else:
		return reset_cookie(request.referrer)

if __name__ == '__main__':
	app.run(host='0.0.0.0')
