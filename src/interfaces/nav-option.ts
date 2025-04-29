//Information for the navigation options on the home page
export interface OptionInfo {
    //The corresponding name of the option
    name: string
    //The value to be passed to setPage
    destination: string
    //The text to appear on the option
    optionText: string;
    //The text to appear on the button
    button: string;
  }