from kivy.lang import Builder
from kivymd.app import MDApp
from kivymd.uix.boxlayout import MDBoxLayout  # Use MDBoxLayout for styling

KV = '''
MDBoxLayout:
    orientation: 'vertical'
    BoxLayout:
        orientation: 'vertical'
        spacing: dp(20)
        padding: dp(20)
        
        AsyncImage:
            source: "animations/sadpenguin.gif"
            anim_delay: 0.1
            allow_stretch: True
            keep_ratio: True
'''

class MainApp(MDApp):
    def build(self):
        return Builder.load_string(KV)

if __name__ == "__main__":
    MainApp().run()

