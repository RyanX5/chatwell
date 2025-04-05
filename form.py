import tkinter as tk
from tkinter import messagebox

# Function to handle form submission
def submit_form():
    # Collecting all user inputs
    hobbies = hobbies_entry.get()
    age = age_entry.get()
    demographic = demographic_var.get()
    race = race_entry.get()
    nationality = nationality_entry.get()
    city = city_entry.get()
    state = state_entry.get()
    gender = gender_var.get()
    marital_status = marital_status_var.get()
    kids = kids_var.get()

    # Displaying a message box with the user's inputs
    messagebox.showinfo("Form Submitted", 
                        f"Hobbies/Activities: {hobbies}\nAge: {age}\nDemographic: {demographic}\nRace: {race}\n"
                        f"Nationality: {nationality}\nCity: {city}\nState: {state}\nGender: {gender}\n"
                        f"Marital Status: {marital_status}\nKids: {kids}")

# Creating the main window
root = tk.Tk()
root.title("User Information Form")

# Creating labels and entries for the form
tk.Label(root, text="Hobbies/Activities:").grid(row=0, column=0, sticky="w")
hobbies_entry = tk.Entry(root, width=40)
hobbies_entry.grid(row=0, column=1)

tk.Label(root, text="Age:").grid(row=1, column=0, sticky="w")
age_entry = tk.Entry(root, width=40)
age_entry.grid(row=1, column=1)

tk.Label(root, text="Demographic:").grid(row=2, column=0, sticky="w")
demographic_var = tk.StringVar()
demographic_dropdown = tk.OptionMenu(root, demographic_var, "Caucasian", "African American", "Hispanic", "Asian", "Other")
demographic_dropdown.grid(row=2, column=1)

tk.Label(root, text="Race:").grid(row=3, column=0, sticky="w")
race_entry = tk.Entry(root, width=40)
race_entry.grid(row=3, column=1)

tk.Label(root, text="Nationality:").grid(row=4, column=0, sticky="w")
nationality_entry = tk.Entry(root, width=40)
nationality_entry.grid(row=4, column=1)

tk.Label(root, text="City:").grid(row=5, column=0, sticky="w")
city_entry = tk.Entry(root, width=40)
city_entry.grid(row=5, column=1)

tk.Label(root, text="State:").grid(row=6, column=0, sticky="w")
state_entry = tk.Entry(root, width=40)
state_entry.grid(row=6, column=1)

tk.Label(root, text="Gender:").grid(row=7, column=0, sticky="w")
gender_var = tk.StringVar()
gender_dropdown = tk.OptionMenu(root, gender_var, "Male", "Female", "Other", "Prefer not to say")
gender_dropdown.grid(row=7, column=1)

tk.Label(root, text="Marital Status:").grid(row=8, column=0, sticky="w")
marital_status_var = tk.StringVar()
marital_status_dropdown = tk.OptionMenu(root, marital_status_var, "Single", "Married", "Divorced", "Widowed")
marital_status_dropdown.grid(row=8, column=1)

tk.Label(root, text="Do you have kids?").grid(row=9, column=0, sticky="w")
kids_var = tk.StringVar()
kids_dropdown = tk.OptionMenu(root, kids_var, "Yes", "No")
kids_dropdown.grid(row=9, column=1)

# Submit button
submit_button = tk.Button(root, text="Submit", command=submit_form)
submit_button.grid(row=10, column=1)

# Running the main loop to display the form
root.mainloop()
