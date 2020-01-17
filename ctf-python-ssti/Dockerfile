FROM python:3.7

COPY app /app
WORKDIR /app

RUN pip install -r requirements.txt

WORKDIR /app

# USER guest

ENTRYPOINT ["python"]

CMD ["app.py"]

# Build
#docker image build -t ctf-python-ssti .
# Run 
#docker run --name ctf-python-ssti -d -p 5000:5000 -it --rm ctf-python-ssti
