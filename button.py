import gpiozero as gpio
import pyperclip as clip
import keyboard

cameraButton = gpio.Button(13)

def buttonPressed(x):
    print("pressed")
    clip.copy('/img')
    keyboard.press_and_release('ctrl+v')
    keyboard.press_and_release('enter')

cameraButton.when_pressed = buttonPressed

keyboard.wait()