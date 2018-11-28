package com.datadrafter.modeler;

/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: </p>
 * @author not attributable
 * @version 1.0
 */
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.StringTokenizer;
import java.util.Vector;

//import com.datadrafter.events.LinkAction;
//import com.datadrafter.events.LinkActionEvent;
//import com.datadrafter.events.LinkActionListener;
//import com.datadrafter.firehouse.FirehouseInterface;
//import com.datadrafter.utils.Utils;

public class Details { //implements ObjectActionListener {
  private static Vector details = new Vector();
  private static Vector modified = new Vector();
  private static String filename;
  private static boolean clean = true;
  
//  public Details(FirehouseInterface firehouse) {
//    firehouse.getDetails();
//    ObjectAction.addObjectActionListener(this);
//  }

  public Details(URL url) {
	  load(url);
  }
  
  public Details(String filename) {
    Details.filename = filename;
    load(filename);
    //ObjectAction.addObjectActionListener(this);
  }

  public static Vector getModified() {
    return modified;
  }

  public static void remove(Detail detail) {
    if (details.remove(detail)) {
      modified.add(detail);
      setClean(false);
    }
  }

  public static Vector getDetails(Attrib attrib) {
    Vector used_in = new Vector();
    Enumeration en = details.elements();
    while (en.hasMoreElements()) {
      Detail detail = (Detail) en.nextElement();
      if (detail.getAttributes().indexOf(attrib) != -1) {
        used_in.add(detail);
      }
    }
    return used_in;
  }

  public void load(String filename) {
	    long tempId;
	    String line = null;
	    String sBuff = null;
	    StringTokenizer st;
	    String token;
	    BufferedReader in = null;
	    Detail detail = null;

	    try {
	        in = new BufferedReader(new FileReader(filename));			
			while (true) {
		        try {
					line = in.readLine();
				} catch (IOException e) {
					e.printStackTrace();
					break;
				}
	        if (line == null || line.length() == 0) {
	          break;
	        }
	        sBuff = "";
	        st = new StringTokenizer(line, "|");
	        token = st.nextToken();
	        if (token.equals("//")) {
	          ;
	        }
	        else if (token.equals("detail")) {
	          if (detail != null) {
	            details.add(detail);
	          }
	          tempId = Long.parseLong(st.nextToken());
	          sBuff += st.nextToken();
	          detail = new Detail(tempId, sBuff, sBuff);
	        }
	        else if (token.equals("attrib")) {
	          tempId = Long.parseLong(st.nextToken());
	          Attrib attrib = Attribs.getAttribute(tempId);
	          detail.addAttribute(attrib);
	          detail.setClean(true);
	        }
	      }
	      if (detail != null) {
	        details.add(detail);
	      }
	      modified.clear();
	      in.close();
	    }
	    catch (IOException ie) {
	    	ie.printStackTrace();
	    }	    
	    catch (NumberFormatException nfe) {
	    	nfe.printStackTrace();
	    }
	    catch (NoSuchElementException nse) {
	    	nse.printStackTrace();
	    }
	    setClean(true);
	  }

  public void load(URL url) {
    long tempId;
    String line = null;
    String sBuff = null;
    StringTokenizer st;
    String token;
    BufferedReader in = null;
    Detail detail = null;

    try {
        try {
			InputStream is = url.openStream(); 
			InputStreamReader inR = new InputStreamReader(is) ; 
			in = new BufferedReader(inR) ;
		} catch (IOException e1) {
			e1.printStackTrace();
		}      while (true) {
			
	        try {
				line = in.readLine();
			} catch (IOException e) {
				e.printStackTrace();
				break;
			}
        if (line == null || line.length() == 0) {
          break;
        }
        sBuff = "";
        st = new StringTokenizer(line, "|");
        token = st.nextToken();
        if (token.equals("//")) {
          ;
        }
        else if (token.equals("detail")) {
          if (detail != null) {
            details.add(detail);
          }
          tempId = Long.parseLong(st.nextToken());
          sBuff += st.nextToken();
          detail = new Detail(tempId, sBuff, sBuff);
        }
        else if (token.equals("attrib")) {
          tempId = Long.parseLong(st.nextToken());
          Attrib attrib = Attribs.getAttribute(tempId);
          detail.addAttribute(attrib);
          detail.setClean(true);
        }
      }
      if (detail != null) {
        details.add(detail);
      }
      modified.clear();
      try {
		in.close();
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
    }
    catch (NumberFormatException nfe) {
    	nfe.printStackTrace();
    }
    catch (NoSuchElementException nse) {
    	nse.printStackTrace();
    }
    setClean(true);
  }

  public static void add(Detail detail) {
    details.add(detail);
    //modified.add(detail);
    setClean(false);
  }

  public static Vector getDetails() {
    return details;
  }

  public static Detail getAttributeDetail(long id) {
    Iterator iter = details.iterator();
    while (iter.hasNext()) {
      Detail detail = (Detail) iter.next();
      if (detail.getId() == id) {
        return detail;
      }
    }
    return null;
  }

  public static void toFile() {

	  try {
		  PrintWriter out = new PrintWriter(new FileWriter(filename));
		  Enumeration en = details.elements();
		  while (en.hasMoreElements()) {
			 ((Detail) en.nextElement()).toFile(out);
		  }
		  out.flush();
		  out.close();
		  modified.clear();
		  setClean(true);
    }
    catch (IOException ioe) {
    	ioe.printStackTrace();
    }
  }

  public static Object[][] toTableData() {
    Object[][] data = new Object[details.size()][2];
    int i = 0;

    Iterator iter = details.iterator();
    while (iter.hasNext()) {
      Detail detail = (Detail) iter.next();
      data[i][0] = detail;
      data[i++][1] = new Boolean(false);
    }
    return data;
  }
  
  public void createDetailsFile(String filename) {
	try {
		new FileWriter(filename, true);
	} catch (IOException e) {
		e.printStackTrace();
	}
  }
/**
 * @return Returns the clean.
 */
  public static boolean isClean() {
	return clean;
  }
/**
 * @param clean The clean to set.
 */
  public static void setClean(boolean clean) {
	Details.clean = clean;
  }
}
