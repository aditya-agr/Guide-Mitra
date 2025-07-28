from django.shortcuts import render

# Create your views here.
import base64
import io
from google.generativeai import GenerativeModel, configure
from gtts import gTTS
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from googletrans import Translator
import os

key = os.getenv("GEMINI_API")

# Configure Gemini API
configure(api_key=key)
model = GenerativeModel(model_name="gemini-1.5-flash-latest")

# Define the view
from .utils import translate_to_hindi

@csrf_exempt
def process_image(request):
    if request.method == 'POST':
        print(request.FILES)
        try:
            # Check if the image is in the request
            if 'image' not in request.FILES:
                return JsonResponse({"error": "No image file found in request"}, status=400)

            # Get the uploaded file
            image_file = request.FILES['image']

            # Save the file temporarily
            image_path = default_storage.save(f"temp/{image_file.name}", image_file)

            # Open the image and encode it in Base64
            with default_storage.open(image_path, 'rb') as img_file:
                image = img_file.read()

            prompt = "You have to behave as a tourist guide. Prepare a brief summary of historical significance or historical story related to the place shown in the image in interesting manner in approax 100 words."
            response = model.generate_content([{'mime_type':'image/jpeg', 'data': base64.b64encode(image).decode('utf-8')}, prompt])

            gemini_response_text = response.text  # Replace with actual API response
            print(gemini_response_text)
            
            try:
                translated_text = translate_to_hindi(gemini_response_text)
            except RuntimeError as e:
                return JsonResponse({"error": f"Translation failed: {str(e)}"}, status=500)

            # Convert translated text to speech
            tts = gTTS(translated_text, lang='hi')
            mp3_buffer = io.BytesIO()
            tts.write_to_fp(mp3_buffer)
            mp3_buffer.seek(0) 
            mp3_path = default_storage.save("output/output.mp3", mp3_buffer)
            
            with default_storage.open(mp3_path, 'rb') as mp3_file:
                mp3_data = base64.b64encode(mp3_file.read()).decode('utf-8')

            # Cleanup temporary files
            default_storage.delete(image_path)
            default_storage.delete(mp3_path)

            return JsonResponse({
                'translated_text': translated_text,
                'mp3': mp3_data
            })

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method.'}, status=400)
