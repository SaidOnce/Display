from openpyxl import load_workbook, Workbook
from os import mkdir, path, listdir, remove
import random, string
import shutil
from pathlib import Path


class db():
    def __init__(self):
        if not path.exists("auth"):
            mkdir("auth")
        pass

    
    def generateHash(self, length):
        characters = string.ascii_lowercase + string.ascii_uppercase + string.digits
        return ''.join(random.choice(characters) for _ in range(length))


    def addUser(self, userName, password):
        try:
            pathToCreate = f"auth\\userList.xlsx"
            wb=None
            ws=None
            folder_path = Path("auth")
            if folder_path.is_dir():
                xlsx_files = list(folder_path.glob("*.xlsx"))
                if xlsx_files:
                    wb = load_workbook(pathToCreate)
                    ws = wb.active
                else:
                    wb = Workbook()
                    ws = wb.active
            else:
                print("Указанная папка не существует.")
            wb.save(f"{pathToCreate}")
            row = 1
            while not ws.cell(row=row,column=1).value == None:
                if ws.cell(row=row,column=1).value == userName:
                    return(False, "Данное имя уже занято")
                row += 1
            ws.cell(row=row, column=1).value = userName
            ws.cell(row=row, column=2).value = password
            ws.cell(row=row, column=3).value = self.generateHash(8)
            wb.save(pathToCreate)
            return (True, "Модель успешно созданна.")
        except Exception as e:
            return (False, "Ошибка: " + str(e))
        