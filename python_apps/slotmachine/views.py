from django.shortcuts import render
import random

def slotmachine(request):
    context={}
    alphanumeric_strings = ["G01225423", "H02326232", "E02320353", "G01210353", "A06780232", "H09990333", "E12345232","G01392010"]
    Names = ['Vijay Salgaokar','Chulbul Pandey','Neeraj Chopra','Hrithik Roshan','Veer Gupta','Sudhir Chaudhary','Robin Thakur','Suraj Kumar']
    selected_string = random.choice(alphanumeric_strings)

    # Pass the selected string as context data to the template
    context['selected_string'] =  selected_string
    context['name'] = Names[alphanumeric_strings.index(selected_string)]

    # Render the template with the context data
    return render(request, "slotmachine.html", context)

def raffle_home(request):

    context = {}

    return render(request, "raffle_home.html", context)