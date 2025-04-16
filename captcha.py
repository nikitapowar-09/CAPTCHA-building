import tkinter as tk
from tkinter import messagebox
import random
import string
from PIL import Image, ImageDraw, ImageFont, ImageTk

# Generate a random CAPTCHA text
def generate_captcha_text(length=6):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

# Create CAPTCHA image
def generate_captcha_image(captcha_text):
    width, height = 150, 50
    image = Image.new('RGB', (width, height), 'white')
    draw = ImageDraw.Draw(image)
    
    try:
        font = ImageFont.truetype("arial.ttf", 30)  # Ensure arial.ttf is available
    except:
        font = ImageFont.load_default()
    
    draw.text((20, 10), captcha_text, font=font, fill='black')
    
    return image

# Refresh CAPTCHA
def refresh_captcha():
    global captcha_text, captcha_image_tk
    captcha_text = generate_captcha_text()
    image = generate_captcha_image(captcha_text)
    captcha_image_tk = ImageTk.PhotoImage(image)
    captcha_label.config(image=captcha_image_tk)
    captcha_entry.delete(0, tk.END)
    robot_var.set(0)  # Reset checkbox

# Validate user input
def validate_captcha():
    user_input = captcha_entry.get().strip()
    
    if not robot_var.get():
        messagebox.showerror("Error", "Please confirm that you are not a robot!")
        return
    
    if user_input == captcha_text:
        messagebox.showinfo("Success", "CAPTCHA Verified Successfully!")
    else:
        messagebox.showerror("Error", "CAPTCHA Verification Failed! Try Again.")

# Create GUI Window
root = tk.Tk()
root.title("CAPTCHA Verification")
root.geometry("300x250")
root.resizable(False, False)

# Generate initial CAPTCHA
captcha_text = generate_captcha_text()
captcha_image = generate_captcha_image(captcha_text)
captcha_image_tk = ImageTk.PhotoImage(captcha_image)

# UI Elements
captcha_label = tk.Label(root, image=captcha_image_tk)
captcha_label.pack(pady=10)

captcha_entry = tk.Entry(root, font=("Arial", 14))
captcha_entry.pack(pady=5)

robot_var = tk.IntVar()
robot_checkbox = tk.Checkbutton(root, text="I am not a robot", variable=robot_var, font=("Arial", 12))
robot_checkbox.pack(pady=5)

validate_button = tk.Button(root, text="Verify CAPTCHA", command=validate_captcha, font=("Arial", 12))
validate_button.pack(pady=5)

refresh_button = tk.Button(root, text="Refresh CAPTCHA", command=refresh_captcha, font=("Arial", 10))
refresh_button.pack(pady=5)

# Run the Tkinter main loop
root.mainloop()
