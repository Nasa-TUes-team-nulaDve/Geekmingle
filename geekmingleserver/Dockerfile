# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

#Update pip
RUN pip install --upgrade pip

# Install the dependencies
RUN pip install -r requirements.txt


# Expose the port the app runs on
EXPOSE 5000

# Run the application
CMD ["python", "main.py"]
