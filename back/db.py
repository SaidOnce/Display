from openpyxl import load_workbook, Workbook
from os import mkdir, path, listdir, remove
import random, string
import shutil
from pathlib import Path

class db():
    def __init__(self):
        if not path.exists("brands"):
            mkdir("brands")
        pass


    def generateHash(self, length):
        characters = string.ascii_lowercase + string.ascii_uppercase + string.digits
        return ''.join(random.choice(characters) for _ in range(length))


    def addBrand(self, brand):
        try:
            tree = list(Path("brands").rglob("*"))
            pathToCreate = f"brands\\{brand}"
            for i in tree:
                if str(i).lower() == str(pathToCreate).lower():
                    return (False, "Бренд уже существует")
            mkdir("brands/" + brand)
            return (True, "Успешно создан")
        except Exception as e:
            return (False, "Ошибка: " + str(e))


    def removeBrand(self, brand):
        try:
            namePath = f"brands/{brand}"
            if not path.exists(namePath):
                return (False, "Модели не существует.")
            shutil.rmtree(namePath)
            return (True, "Успешно удалён бренд: " + brand)
        except Exception as e:
            return (False, "Ошибка: " + str(e))
        
    
    def getBrands(self):
        try:
            if not path.exists("brands"):
                return (False, "Брендов не существует.")
            brands = []
            for item in listdir("brands"):
                if path.isdir(path.join("brands", item)):
                    brands.append(item)
            return (True, brands)
        except Exception as e:
            return (False, "Ошибка: " + str(e))


    def addModel(self, brand, model):
        try:
            tree = list(Path("brands\\" + brand).rglob("*"))
            pathToCreate = f"brands\\{brand}\\{model}.xlsx"
            for i in tree:
                if str(i).lower() == str(pathToCreate).lower():
                    return (False, "Бренд уже существует")
            wb = Workbook()
            wb.save(f"brands/{brand}/{model}.xlsx")
            return (True, "Модель успешно созданна.")
        except Exception as e:
            return (False, "Ошибка: " + str(e))


    def getModels(self, brand):
        try:
            pathName = f"brands/{brand}"
            if not path.exists(pathName):
                return (False, "Бренд не найдены")
            
            models = []
            for item in listdir(pathName):
                full_path = path.join(pathName, item)
                if path.isfile(full_path):
                    models.append(item[:-5])
            return (True, models)
        except Exception as e:
            return (False, "Ошибка: " + str(e))
    

    def removeModel(self, brand, model):
        try:
            namePath = f"brands/{brand}/{model}.xlsx"
            if not path.exists(namePath):
                return (False, "Модели не существует.")
            remove(namePath)
            return (True, "Успешно удаленна модель: " + model)
        except Exception as e:
            return (False, "Ошибка: " + str(e))


    def addSparePartType(self, brand, model, sparePart):
        try:
            if not path.exists(f"brands/{brand}/{model}.xlsx"):
                return (False, "Данной модели не существует")
            wb = load_workbook(f"brands/{brand}/{model}.xlsx")
            if sparePart in wb.sheetnames:
                return (False, "Данная запчасть уже существует")
            wb.create_sheet(sparePart)
            ws = wb[sparePart]
            ws.cell(row=1, column=1).value = "Название"
            ws.cell(row=1, column=2).value = "Цена"
            ws.cell(row=1, column=3).value = "Количество"
            ws.cell(row=1, column=4).value = "ID"
            wb.save(f"brands/{brand}/{model}.xlsx")
            return (True, "Данная запчасть успешно созданна")
        except Exception as e:
            return (False, "Ошибка: " + str(e))
    
    
    def addSparePart(self, brand, model, sparePart, name, price, amount):
        try:
            namePath = f"brands/{brand}/{model}.xlsx"
            if not path.exists(namePath):
                return (False, "Модели не существует.")
            wb = load_workbook(namePath)
            ws = wb[sparePart]
            row = 2
            while not ws.cell(row=row, column=1).value == None: row += 1
            ws.cell(row=row, column=1).value = name
            ws.cell(row=row, column=2).value = price
            ws.cell(row=row, column=3).value = amount
            ws.cell(row=row, column=4).value = self.generateHash(8)

            wb.save(namePath)
            return (True, "Дисплей успешно добавлен.")
        except Exception as e:
            return (False, "Ошибка: " + str(e))
            
    
    def getSparePartTypes(self, brand, model):
        try:
            pathName = f"brands/{brand}/{model}.xlsx"
            if not path.exists(pathName):
                return (False, "Бренд не найдены")
            
            wb = load_workbook(pathName)
            sparePartTypes = wb.sheetnames
            
            return (True, sparePartTypes)            
        except Exception as e:
            return (False, "Ошибка: " + str(e))
        

    def getSpareParts(self, brand, model, sparePart):
        try:
            pathName = f"brands/{brand}/{model}.xlsx"
            if not path.exists(pathName):
                return (False, "Бренд не найдены")
            
            wb = load_workbook(pathName)
            sparePartTypes = wb.sheetnames
            
            return (True, sparePartTypes)            
        except Exception as e:
            return (False, "Ошибка: " + str(e))