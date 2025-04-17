from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import Project, Service, TeamMember
from .forms import ContactForm
import requests
import json
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def get_github_data(username):
    """Fetch data from GitHub API for a given username"""
    if not username:
        return None
    
    try:
        # Fetch basic user info
        user_response = requests.get(f'https://api.github.com/users/{username}')
        if user_response.status_code != 200:
            logger.warning(f"Failed to get GitHub data for {username}. Status code: {user_response.status_code}")
            return None
        
        user_data = user_response.json()
        
        # Fetch repositories
        repos_response = requests.get(f'https://api.github.com/users/{username}/repos?sort=updated&per_page=5')
        if repos_response.status_code != 200:
            repos_data = []
        else:
            repos_data = repos_response.json()
            
        return {
            'profile': user_data,
            'repositories': repos_data
        }
    except Exception as e:
        logger.error(f"Error fetching GitHub data: {str(e)}")
        return None

def home(request):
    """View for the homepage"""
    services = Service.objects.all()[:3]  # Get first 3 services for homepage
    projects = Project.objects.all()[:3]  # Get latest 3 projects for homepage
    
    context = {
        'services': services,
        'projects': projects,
        'title': 'Frenz - Tech Solutions Company',
        'meta_description': 'Frenz provides web development, app development, web design, UI/UX design, and product design services.',
    }
    return render(request, 'home.html', context)

def projects(request):
    """View for projects page"""
    projects = Project.objects.all()
    context = {
        'projects': projects,
        'title': 'Our Projects | Frenz',
        'meta_description': 'Check out our portfolio of projects in web development, app development, and design.',
    }
    return render(request, 'projects.html', context)

def project_detail(request, slug):
    """View for individual project page"""
    project = get_object_or_404(Project, slug=slug)
    context = {
        'project': project,
        'technologies': project.get_technologies_list(),
        'title': f'{project.title} | Frenz Projects',
        'meta_description': project.description[:160],
    }
    return render(request, 'project_detail.html', context)

def services(request):
    """View for services page"""
    services = Service.objects.all()
    context = {
        'services': services,
        'title': 'Our Services | Frenz',
        'meta_description': 'Frenz offers web development, app development, web design, UI/UX design, and product design services.',
    }
    return render(request, 'services.html', context)

def contact(request):
    """View for contact page"""
    form = ContactForm()
    
    context = {
        'form': form,
        'title': 'Contact Us | Frenz',
        'meta_description': 'Get in touch with Frenz for your web development, app development, and design needs.',
    }
    return render(request, 'contact.html', context)

def about(request):
    """View for about page"""
    team_members = TeamMember.objects.all()
    
    context = {
        'team_members': team_members,
        'title': 'About Us | Frenz',
        'meta_description': 'Learn more about Frenz, our mission, values, and the talented team behind our success.',
    }
    return render(request, 'about.html', context)

def team_member_detail(request, slug):
    """View for individual team member profile page"""
    team_member = get_object_or_404(TeamMember, slug=slug)
    
    # Get a few other team members for the "Meet other team members" section
    other_team_members = TeamMember.objects.exclude(id=team_member.id)[:3]
    
    # Fetch GitHub data if username is provided
    github_data = None
    if team_member.github_username:
        github_data = get_github_data(team_member.github_username)
    
    context = {
        'member': team_member,
        'skills': team_member.get_skills_list(),
        'other_members': other_team_members,
        'github_data': github_data,
        'title': f'{team_member.name} | Frenz Team',
        'meta_description': f'Meet {team_member.name}, {team_member.position} at Frenz. Learn more about their skills, experience, and background.',
    }
    return render(request, 'team_member_detail.html', context)
