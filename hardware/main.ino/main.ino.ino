#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels



Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

int HomeA[] = { 6, 7, 8 , 9 };
int HomeB[] = { 10, 11 , 12, 13};

String homeA = "homeA";
String homeB = "homeB";



float powerValue = 0;
String delimeter = " ";
int lastTime = 0;
int delayTime = 5000;
void setup() {
  Serial.begin(9600);

  pinMode(A0, INPUT);
  // HomeA
  pinMode(HomeA[0], OUTPUT);
  pinMode(HomeA[1], OUTPUT);
  pinMode(HomeA[2], OUTPUT);
  pinMode(HomeA[3], OUTPUT);
  // HomeB
  pinMode(HomeB[0], OUTPUT);
  pinMode(HomeB[1], OUTPUT);
  pinMode(HomeB[2], OUTPUT);
  pinMode(HomeB[3], OUTPUT);


  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { // Address 0x3D for 128x64
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
  }
  delay(2000);
  display.clearDisplay();

  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 10);
  // Display static text
  display.println("Power Generated");
  display.display(); 

}

void UpdatePowerValue() {
  float ldr = analogRead(A0);
  if ((millis() - lastTime) > delayTime ){
    powerValue += ldr;
    lastTime = millis();
  }

    
    display.clearDisplay();
    display.setCursor(0, 10);
    // Display static text
    display.println("Power Generated");
    // Serial.println(ldr);
  
    // Serial.println(1000-ldr);
    
    display.setCursor(0,20);
    display.println(powerValue);
    if (ldr >= 800) {
      display.setCursor(0,30);
      display.println("night Time");
    }else {
      display.println("Day Time");
    }
    display.display();
    
  
}

void loop() {
  UpdatePowerValue();
  if (Serial.available()){
    
    // String strValue = Serial.readStringUntil('\n');
    String strValue = Serial.readString();
    strValue.trim();
    // Serial.println(strValue);

    if (strValue.startsWith("getPowerReading")) {
      Serial.println(powerValue);
      
    } else if (strValue.startsWith("powerSubtract")) {
      int findSpace = strValue.indexOf(delimeter);
      int powerToSubtract = strValue.substring(findSpace, strValue.length()).toInt();
      Serial.println(powerToSubtract);
      if (powerToSubtract > powerValue) {
        Serial.println("Not enough resources");
      }else{
        powerValue -= powerToSubtract;
      }


    } else if (strValue.startsWith("powerToggle")) {
      // depending on the type of string forwarded
      // powerToggle homeID 0
      int findSpace = strValue.indexOf(delimeter);
      int nextSpace = strValue.indexOf(delimeter, findSpace+1);

      String homeId = strValue.substring(findSpace, nextSpace);
      homeId.trim();
      int appliancesNumber = strValue.substring(nextSpace, strValue.length()).toInt();

      if(homeId.startsWith(homeA)){

          digitalWrite(HomeA[appliancesNumber],HIGH);
      }else if(homeId.startsWith(homeB)){
          digitalWrite(HomeB[appliancesNumber], HIGH);
      }

      Serial.println(homeId);j
      Serial.println(appliancesNumber);

  }
  }
}
