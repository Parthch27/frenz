from django.db import models
from django.utils.text import slugify

class TeamMember(models.Model):
    """Model for storing team member information"""
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    bio = models.TextField()
    image = models.ImageField(upload_to='team/', blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    github_username = models.CharField(max_length=100, blank=True, null=True, help_text="GitHub username for API integration")
    twitter = models.URLField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0, help_text="Order in which to display team members")
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    skills = models.CharField(max_length=255, help_text="Comma-separated list of skills", blank=True)
    experience_years = models.PositiveIntegerField(default=0, help_text="Years of experience")
    personal_contact = models.CharField(max_length=255, blank=True, null=True, help_text="Personal contact details like phone number or WhatsApp")
    education = models.TextField(blank=True, null=True, help_text="Education history and qualifications")
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def get_skills_list(self):
        """Returns skills as a list"""
        if not self.skills:
            return []
        return [skill.strip() for skill in self.skills.split(',')]
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['order', 'name']

class Project(models.Model):
    """Model for storing project information"""
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.CharField(max_length=255, help_text="Comma-separated list of technologies used")
    image = models.ImageField(upload_to='projects/')
    project_url = models.URLField(blank=True, null=True, help_text="Link to live project or GitHub")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    slug = models.SlugField(max_length=200, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def get_technologies_list(self):
        """Returns technologies as a list"""
        return [tech.strip() for tech in self.technologies.split(',')]

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']


class Service(models.Model):
    """Model for storing services offered by the company"""
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon_class = models.CharField(max_length=50, help_text="Font Awesome icon class", default="fas fa-cogs")
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['id']
