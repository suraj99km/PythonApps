from django.shortcuts import render

def config(request):
    return render(request, "ppt_config_generator.html")

def pptgenerator(request):
    return render(request, "ppt_generator.html")