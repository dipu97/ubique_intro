from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Card
from django.utils.translation import gettext_lazy as _


# Register your models here.


class CustomUserAdmin(UserAdmin):
    list_display = (
   "id", "username", "first_name", "last_name", "email", "job_title", "profile_picture", "profile_picture_url")

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_("Personal info"), {"fields": (
        "first_name", "last_name", "email", 'bio', 'profile_picture', 'job_title', 'facebook', 'twitter', 'instagram',
        'linkedin')}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {
            'fields': ('bio', 'profile_picture', 'job_title', 'facebook', 'twitter', 'instagram', 'linkedin')
        }),
    )


admin.site.register(CustomUser, CustomUserAdmin)


class CardAdmin(admin.ModelAdmin):
    list_display = ("id","title", "is_draft", "author", "category", "created_at","featured_image","featured_image_url")


admin.site.register(Card, CardAdmin)