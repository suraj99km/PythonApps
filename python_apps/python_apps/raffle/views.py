from django.shortcuts import render
import random

def raffle(request):
    alphanumeric_strings = ["G01225423", "H02326232", "E02320353", "G01210353", "A56780232", "H99990333", "E12345232"]
    selected_string = random.choice(alphanumeric_strings)

    # Pass the selected string as context data to the template
    context = {'selected_string': selected_string}

    # Render the template with the context data
    return render(request, "raffle_app.html", context)
