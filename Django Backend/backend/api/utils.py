from googletrans import Translator

def translate_to_hindi(text):
    if not text:
        raise ValueError("Input text is empty. Cannot translate.")
    
    translator = Translator()
    print(text)
    try:
        result = translator.translate(text, src='en', dest='hi')
        print(result)
        return result.text if result else "Translation failed"
    except Exception as e:
        return f"Translation error: {str(e)}"
