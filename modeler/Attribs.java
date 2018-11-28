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
import java.io.FileNotFoundException;
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

public class Attribs { //implements ObjectActionListener {
  private static Vector attribs = new Vector();
  private static Vector modified = new Vector();
  private static String filename = null;
  private static boolean clean = true;
  
//  public Attribs(FirehouseInterface firehouse) {
//    attribs = getAttributes(firehouse);
//    ObjectAction.addObjectActionListener(this);
//  }

  public Attribs(URL url) {
	  load(url);
  }
  public Attribs(String filename) {
    Attribs.filename = filename;
    //System.out.println("filename-> " + filename);
    load(filename);
    //ObjectAction.addObjectActionListener(this);
  }

  public static void add(Attrib attrib) {
    attribs.add(attrib);
    setClean(false);
    //modified.add(attrib);
  }

  public static void remove(Attrib attrib) {
    attribs.remove(attrib);
    setClean(false);
    //modified.add(attrib);
  }

  public static Vector getModified() {
    return modified;
  }

  public void load(String filename) {
    //long tempId;
    String line = null;
    //String sBuff = null;
    StringTokenizer st;
    String token;
    BufferedReader in = null;
    //Detail detail = null;

    try {
      in = new BufferedReader(new FileReader(filename));
      while (true) {
        line = in.readLine();
        if (line == null || line.length() == 0) {
          break;
        }
        //sBuff = "";
        st = new StringTokenizer(line, "|");
        token = st.nextToken();
        if (token.equals("//")) {
          ;
        }
        else if (token.equals("ATTRIB")) {
          Attrib attrib = new Attrib(Long.parseLong(st.nextToken()),
                                           st.nextToken(),
                                           st.nextToken());
          attribs.add(attrib);
        }
      }
      modified.clear();
      setClean(true);
      in.close();
    }
    catch (FileNotFoundException fnfe) {
    	System.out.println(fnfe.getMessage());
		createAttributesFile(filename);    	
    }
    catch (IOException ioe) {
    	System.out.println(ioe.getMessage());
    	ioe.printStackTrace();
    }
    catch (NumberFormatException nfe) {
    	System.out.println(nfe.getMessage());
    	nfe.printStackTrace();
    }
    catch (NoSuchElementException nse) {
    	nse.getMessage();
        nse.printStackTrace();
    }
  }

  public void load(URL url) {
	    String line = null;
	    StringTokenizer st;
	    String token;
	    BufferedReader in = null;

	    try {
		    try {
				InputStream is = url.openStream(); 
				InputStreamReader inR = new InputStreamReader(is) ; 
				in = new BufferedReader(inR) ;
			} catch (IOException e1) {
				e1.printStackTrace();
			}
	      while (true) {
	        line = in.readLine();
	        if (line == null || line.length() == 0) {
	          break;
	        }
	        //sBuff = "";
	        st = new StringTokenizer(line, "|");
	        token = st.nextToken();
	        if (token.equals("//")) {
	          ;
	        }
	        else if (token.equals("ATTRIB")) {
	          Attrib attrib = new Attrib(Long.parseLong(st.nextToken()),
	                                           st.nextToken(),
	                                           st.nextToken());
	          attribs.add(attrib);
	        }
	      }
	      modified.clear();
	      setClean(true);
	      in.close();
	    }
	    catch (FileNotFoundException fnfe) {
	    	System.out.println(fnfe.getMessage());
			createAttributesFile(filename);    	
	    }
	    catch (IOException ioe) {
	    	System.out.println(ioe.getMessage());
	    	ioe.printStackTrace();
	    }
	    catch (NumberFormatException nfe) {
	    	System.out.println(nfe.getMessage());
	    	nfe.printStackTrace();
	    }
	    catch (NoSuchElementException nse) {
	    	nse.getMessage();
	        nse.printStackTrace();
	    }
	  }

  public static Vector getAttributes() {
    return attribs;
  }

//  public static Vector getAttributes(FirehouseInterface fire) {
//    return fire.getAttributes();
//  }

  public static Attrib getAttribute(long id) {
    Iterator iter = attribs.iterator();
    while (iter.hasNext()) {
      Attrib attrib = (Attrib) iter.next();
      if (attrib.getId() == id) {
        return attrib;
      }
    }
    return null;
  }

  public static void toFile() {
//    if (filename == null) {
//      return;
//    }

    try {
      PrintWriter out = new PrintWriter(new FileWriter(filename));
      Enumeration en = attribs.elements();
      while (en.hasMoreElements()) {
        ((Attrib)en.nextElement()).toFile(out);
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
  public void createAttributesFile(String filename) {
	try {
		//FileWriter fw = 
		new FileWriter(filename, true);
	} catch (IOException e) {
		e.printStackTrace();
	}
  }

  public static Object[][] toTableData() {
    Object[][] data = new Object[attribs.size()][2];
    int i = 0;

    Iterator iter = attribs.iterator();
    while (iter.hasNext()) {
      Attrib attrib = (Attrib) iter.next();
      data[i][0] = attrib;
      data[i++][1] = new Boolean(false);
    }
    return data;
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
	Attribs.clean = clean;
}
}
