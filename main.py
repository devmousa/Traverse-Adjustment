import sys, io

buffer = io.StringIO()
sys.stdout = sys.stderr = buffer

import eel
import math as m
import xlsxwriter
import random
eel.init('web')

details = {}
bearings = {}
latitudes = {}
departures = {}
correct_latitudes = {}
correct_departures = {}
norths = {}
easts = {}
summations = []

@eel.expose
def addLine(line_name, length, angle):
    try:
        length = float(length)
        angle = float(angle)
    except:
        return "error"
    details[line_name] = [length, angle]

@eel.expose
def addBearing(bearing):
    try:
        bearing = float(bearing)
    except:
        return "error"
    bearings["AB"] = bearing
    try:
        for i in list(details.keys()):
            last_key = list(details.keys())[-2]
            if i != last_key:
                last_bearing = bearings[i]
                if last_bearing > 180:
                    last_bearing = last_bearing - 180
                else:
                    last_bearing = last_bearing + 180
                last_bearing = last_bearing + details[chr(int(ord(i[0])+1))+chr(int(ord(i[0])+2))][1]
                if last_bearing > 360:
                    last_bearing = last_bearing - 360
                elif last_bearing < 0:
                    last_bearing = last_bearing + 360

                bearings[chr(int(ord(i[0])+1))+chr(int(ord(i[0])+2))] = round(last_bearing, 3)
                
            else:
                last_bearing = bearings[i]
                if last_bearing > 180:
                    last_bearing = last_bearing - 180
                else:
                    last_bearing = last_bearing + 180
                last_bearing = last_bearing + details[chr(int(ord(i[0])+1))+"A"][1]
                if last_bearing > 360:
                    last_bearing = last_bearing - 360
                elif last_bearing < 0:
                    last_bearing = last_bearing + 360

                bearings[chr(int(ord(i[0])+1))+"A"] = round(last_bearing, 3)
                
    except:
        pass
        
    for i in list(bearings.keys()):
        latitudes[i] = round(details[i][0] * m.cos(bearings[i] * (m.pi / 180)), 3)
        departures[i] = round(details[i][0] * m.sin(bearings[i] * (m.pi / 180)), 3)

    lengths_sum = sum([i[0] for i in list(details.values())])
    latitudes_sum = sum([i for i in list(latitudes.values())])
    departures_sum = sum([i for i in list(departures.values())])

    for i in list(details.keys()):
        correct_latitudes[i] = round((-latitudes_sum / lengths_sum) * details[i][0] + latitudes[i], 3)
        correct_departures[i] = round((-departures_sum / lengths_sum) * details[i][0] + departures[i], 3)

    summations.append(round(sum([i for i in correct_latitudes.values()]), 3))
    summations.append(round(sum([i for i in correct_departures.values()]), 3))




@eel.expose
def addANorthEast(north, east):
    try:
        north = float(north)
        east = float(east)
    except:
        return "error"
    norths["AB"] = north
    easts["AB"] = east
    try:
        for i in list(details.keys()):
            last_key = list(details.keys())[-2]
            if i != last_key:
                last_north = norths[i]
                last_east = easts[i]
                last_north = last_north + correct_latitudes[i]
                last_east = last_east + correct_departures[i]

                norths[chr(int(ord(i[0])+1))+chr(int(ord(i[0])+2))] = round(last_north, 3)
                easts[chr(int(ord(i[0])+1))+chr(int(ord(i[0])+2))] = round(last_east, 3)
                
            else:
                last_north = norths[i]
                last_east = easts[i]
                last_north = last_north + correct_latitudes[i]
                last_east = last_east + correct_departures[i]

                norths[chr(int(ord(i[0])+1))+"A"] = round(last_north, 3)
                easts[chr(int(ord(i[0])+1))+"A"] = round(last_east, 3)
                
    except:
        pass

@eel.expose
def getData():
    return [list(details.keys()), list(details.values()),  list(bearings.values()), list(latitudes.values()), list(departures.values()),
            list(correct_latitudes.values()), list(correct_departures.values()), list(norths.values()), list(easts.values()), summations]

@eel.expose
def reset():
    global details, bearings, latitudes, departures, correct_latitudes, correct_departures, norths, easts, summations
    details = {}
    bearings = {}
    latitudes = {}
    departures = {}
    correct_latitudes = {}
    correct_departures = {}
    norths = {}
    easts = {}
    summations = []

@eel.expose
def save(file_name, file_extension):
    if file_name == "":
        file_name = f"missing-side-length{random.randint(1, 999)}"
    workbook = xlsxwriter.Workbook(f'{file_name}.{file_extension}')

    worksheet = workbook.add_worksheet("Traverse Adjustment")
    
    row = 0
    
    worksheet.write(row, 0, "Line Name")
    worksheet.write(row, 1, "length")
    worksheet.write(row, 2, "angle")
    worksheet.write(row, 3, "bearing")
    worksheet.write(row, 4, "latitude")
    worksheet.write(row, 5, "departure")
    worksheet.write(row, 6, "correct latitude")
    worksheet.write(row, 7, "correct departure")
    worksheet.write(row, 8, "north")
    worksheet.write(row, 9, "east")

    row += 1

    for k, v in details.items():
        worksheet.write(row, 0, k)
        worksheet.write(row, 1, v[0])
        worksheet.write(row, 2, v[1])
        worksheet.write(row, 3, bearings[k])
        worksheet.write(row, 4, latitudes[k])
        worksheet.write(row, 5, departures[k])
        worksheet.write(row, 6, correct_latitudes[k])
        worksheet.write(row, 7, correct_departures[k])
        worksheet.write(row, 8, norths[k])
        worksheet.write(row, 9, easts[k])
        row += 1
        

    worksheet.write(row, 6, summations[0])
    worksheet.write(row, 7, summations[1])




    
    workbook.close()

    

eel.start('index.html', size=(1140, 728))