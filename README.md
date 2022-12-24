# Rahul-Kumar
Setup instructions:
  i) First Download Project from github
  ii) Open the terminal at that folder location
  iii) Run commond "npm install"
  iv) Then run commond "node app.js"
  v) Then open browser and search for the url localhost:3000
  
How to use:
    i). Present an Email input form to the user
    ii). User enters their email address and presses “Request OTP” button
    iii). App requests an OTP from backend service
    iv). App presents an OTP input form to the user
    v). Copy paste OTP from backend terminal and press “Verify OTP” button
    vi). App verified OTP from backend service
    vii). If OTP matches, show user their email address
    viii). If OTP doesn’t match:
      a). Alert the user about wrong attempt and ask them to retry
      b). Let the user “Request another OTP” which takes user back to Step i
