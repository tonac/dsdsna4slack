from django.contrib import admin
from archives.models import Archive, SlackUser, Channel, Message, Mention

# Register your models here.
admin.site.register(Archive)
admin.site.register(SlackUser)
admin.site.register(Channel)
admin.site.register(Message)
admin.site.register(Mention)
