
package eddcalculator;
import java.time.LocalDate;
import javax.swing.JOptionPane;

public class EDDcalculator {

    public static void main(String[] args) {
        String lmpday = JOptionPane.showInputDialog("Please enter the date of your last regular menstrual period (yyyy-MM-dd) ");
        LocalDate lmpdate = LocalDate.parse(lmpday);
        
        LocalDate EDD= lmpdate.plusDays(280);
        
        JOptionPane.showMessageDialog(null,"Your Estimated date of delivery is: " +  EDD);
           
        
    }
    
}
