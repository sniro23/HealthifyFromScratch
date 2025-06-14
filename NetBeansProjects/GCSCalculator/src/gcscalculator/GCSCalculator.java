
package gcscalculator;

import javax.swing.JOptionPane;


public class GCSCalculator {

    public static void main(String[] args) {
        String motorresponseinput = JOptionPane.showInputDialog
        ("Please enter the motor response:\n" +
    "1 - No motor response\n" +
    "2 - Abnormal extension to pain\n" +
    "3 - Abnormal flexion to pain\n" +
    "4 - Withdrawal from pain\n" +
    "5 - Localizing pain\n" +
    "6 - Obeys commands\n");
        
        String verbalresponseinput = JOptionPane.showInputDialog(
    "Please enter the verbal response:\n" +
    "1 - No verbal response\n" +
    "2 - Incomprehensible sounds\n" +
    "3 - Inappropriate words\n" +
    "4 - Confused conversation\n" +
    "5 - Oriented\n");

        String eyeresponsebyinput = JOptionPane.showInputDialog(
    "Please enter the eye-opening response:\n" +
    "1 - No eye opening\n" +
    "2 - Eye opening to pain\n" +
    "3 - Eye opening to speech\n" +
    "4 - Eyes open spontaneously\n");

        
        int motorreponse = Integer.parseInt(motorresponseinput);
        int verbalreponse = Integer.parseInt(verbalresponseinput);
        int eyereponse = Integer.parseInt(eyeresponsebyinput);
        
        int gcsscore= motorreponse+verbalreponse+eyereponse;
        
        JOptionPane.showMessageDialog(null, "GCS Score is: " + gcsscore);
        
            
    }
    
}
