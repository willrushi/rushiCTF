from base64 import b64encode, b64decode
import subprocess
import sys

def check_decrypt(c):
	try:
		ciphertext = b64decode(c)
		print(ciphertext)
		open('e.txt','wb+').write(bytes(ciphertext))
		(decrypt, err) = subprocess.Popen('openssl rsautl -decrypt -in e.txt -inkey private.pem',shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE).communicate()
		print('Decrypt: ' + str(decrypt))
		print('Err: ' + str(err))
		return decrypt
	except Exception as e:
		print(e)
		return False

#print(check_decrypt(sys.argv[1]))