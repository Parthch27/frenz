from django.contrib import admin
from .models import Project, Service, TeamMember

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'technologies', 'project_url')
    search_fields = ('title', 'description', 'technologies')
    list_filter = ('technologies',)

class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'description_summary')
    search_fields = ('title', 'description')
    
    def description_summary(self, obj):
        # Return first 50 characters of description
        return obj.description[:50] + '...' if len(obj.description) > 50 else obj.description
    
    description_summary.short_description = 'Description'

class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'slug', 'experience_years', 'github_username', 'personal_contact', 'order')
    search_fields = ('name', 'position', 'bio', 'skills', 'education', 'github_username')
    list_editable = ('order', 'experience_years', 'github_username')
    prepopulated_fields = {'slug': ('name',)}
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'position', 'bio', 'image', 'order')
        }),
        ('Skills & Experience', {
            'fields': ('skills', 'experience_years', 'education')
        }),
        ('Contact Information', {
            'fields': ('email', 'personal_contact', 'linkedin', 'github', 'github_username', 'twitter')
        }),
    )

admin.site.register(Project, ProjectAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(TeamMember, TeamMemberAdmin)

# Customize admin site header, title and index title
admin.site.site_header = 'Frenz Portfolio Admin'
admin.site.site_title = 'Frenz Admin Portal'
admin.site.index_title = 'Welcome to Frenz Admin Portal'
