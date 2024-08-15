run:
	uvicorn main:app --reload

env:
	conda env list
	conda env export > environment.yml
install:
	conda install -c conda-forge transformers pytorch fastapi uvicorn python-multipart pillow
