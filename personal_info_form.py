import tkinter as tk
from tkinter import ttk
from tkinter import messagebox
import tkinter.font as tkfont

class InformationIntakeApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Information Intake")
        self.root.geometry("800x600")
        self.root.configure(bg="#FFB6F3")  # Light pink background similar to the Figma design
        
        # Custom fonts - using more playful, readable fonts
        self.title_font = tkfont.Font(family="Comic Sans MS", size=16, weight="bold")
        self.subtitle_font = tkfont.Font(family="Lucida Handwriting", size=18)
        self.label_font = tkfont.Font(family="Arial Rounded MT Bold", size=12)
        self.input_font = tkfont.Font(family="Calibri", size=11)
        
        self.create_widgets()
    
    def create_widgets(self):
        # Title with star icon in top corner to simulate a tab
        title_frame = tk.Frame(self.root, bg="#FFB6F3")
        title_frame.pack(anchor="nw", padx=20, pady=10)
        
        title_label = tk.Label(title_frame, text="Information Intake", font=self.title_font, bg="#E395E1", padx=10, pady=5)
        title_label.pack(side=tk.LEFT)
        
        star_label = tk.Label(title_frame, text="★", font=self.title_font, fg="red", bg="#E395E1")
        star_label.pack(side=tk.LEFT)
        
        # Subtitle
        subtitle_label = tk.Label(self.root, text="We want to hear about you:", font=self.subtitle_font, bg="#FFB6F3")
        subtitle_label.pack(pady=(30, 20))
        
        # Activity Icons
        icon_frame = tk.Frame(self.root, bg="#FFB6F3")
        icon_frame.pack(fill=tk.X, padx=50)
        
        # Swimming icon (simplified)
        swim_label = tk.Label(icon_frame, text="🏊", font=("Arial", 24), bg="#FFB6F3")
        swim_label.pack(side=tk.LEFT, padx=20)
        
        # Gender icon (simplified)
        gender_label = tk.Label(icon_frame, text="⚧️", font=("Arial", 24), bg="#FFB6F3")
        gender_label.pack(side=tk.LEFT, padx=20)
        
        # Globe icon (simplified)
        globe_label = tk.Label(icon_frame, text="🌐", font=("Arial", 24), bg="#FFB6F3")
        globe_label.pack(side=tk.RIGHT, padx=20)
        
        # Running icon (simplified)
        run_label = tk.Label(icon_frame, text="🏃", font=("Arial", 24), bg="#FFB6F3")
        run_label.pack(side=tk.RIGHT, padx=20)
        
        # Hobbies/Activities
        hobbies_label = tk.Label(self.root, text="Hobbies/Activities", font=self.label_font, bg="#FFB6F3")
        hobbies_label.pack(pady=(20, 5))
        
        hobbies_entry = tk.Text(self.root, height=4, width=50, font=self.input_font)
        hobbies_entry.pack(pady=(0, 15))
        
        # Create two columns for form fields
        form_frame = tk.Frame(self.root, bg="#FFB6F3")
        form_frame.pack(fill=tk.BOTH, expand=True, padx=50, pady=10)
        
        left_frame = tk.Frame(form_frame, bg="#FFB6F3")
        left_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        right_frame = tk.Frame(form_frame, bg="#FFB6F3")
        right_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)
        
        # Left column fields
        self.create_field(left_frame, "Native Tongue:", entry_type="entry")
        
        # Updated demographic dropdown with the specified options
        self.create_field(left_frame, "Demographic:", entry_type="combobox", 
                         values=["Caucasian", "African American", "Hispanic", "Asian", "Other"])
                         
        self.create_field(left_frame, "Race:", entry_type="entry")
        self.create_field(left_frame, "Nationality:", entry_type="entry")
        self.create_field(left_frame, "Gender:", entry_type="combobox",
                         values=["Select...", "Male", "Female", "Non-binary", "Other", "Prefer not to say"])
        
        # Right column fields
        self.create_field(right_frame, "Age:", entry_type="entry")
        self.create_field(right_frame, "City:", entry_type="entry")
        self.create_field(right_frame, "State:", entry_type="entry")
        self.create_field(right_frame, "Marital Status:", entry_type="combobox",
                         values=["Select...", "Single", "Married", "Divorced", "Widowed", "Other"])
        self.create_field(right_frame, "Kids? / Dependents?:", entry_type="combobox",
                         values=["Select...", "Yes", "No"])
        
        # Submit button - styled to be more button-like
        submit_btn = tk.Button(self.root, text="Submit", command=self.submit_form,
                             bg="#6B5B95", fg="white", font=self.label_font,
                             width=15, height=1, borderwidth=0, cursor="hand2",
                             activebackground="#5A4A84")
        submit_btn.pack(pady=(10, 30))
    
    def create_field(self, parent, label_text, entry_type="entry", values=None):
        frame = tk.Frame(parent, bg="#FFB6F3")
        frame.pack(fill=tk.X, pady=5)
        
        label = tk.Label(frame, text=label_text, font=self.label_font, bg="#FFB6F3", width=15, anchor="w")
        label.pack(side=tk.LEFT, padx=(0, 5))
        
        if entry_type == "entry":
            entry = tk.Entry(frame, width=20, font=self.input_font)
            entry.pack(side=tk.LEFT, fill=tk.X, expand=True)
        elif entry_type == "combobox":
            style = ttk.Style()
            style.configure('TCombobox', font=self.input_font)
            entry = ttk.Combobox(frame, values=values, width=18, font=self.input_font)
            entry.current(0)
            entry.pack(side=tk.LEFT, fill=tk.X, expand=True)
        
        return entry
    
    def submit_form(self):
        messagebox.showinfo("Form Submitted", "Thank you for your information!")

if __name__ == "__main__":
    root = tk.Tk()
    app = InformationIntakeApp(root)
    root.mainloop()
