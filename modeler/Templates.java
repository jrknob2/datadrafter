package com.datadrafter.modeler;

/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c)</p>
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

import com.datadrafter.utils.Utils;

public class Templates {

  private static Vector templates = new Vector();
  private static Vector modified = new Vector();
  //private static String filename;
  private static boolean clean = true;
  
  public Templates(URL url) {
	  load(url);
  }
  public Templates(String filename) {
	  load(filename);
  }

  public static Vector getModified() {
    return modified;
  }

  public static Vector getTemplates() {
    return templates;
  }

  public static Vector getDetailTemplates(Detail detail) {
    Vector used_in = new Vector();
    Enumeration en = templates.elements();
    while (en.hasMoreElements()) {
      Template template = (Template) en.nextElement();
      if (template.getDetails().indexOf(detail) != -1) {
        used_in.add(template);
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
    Template template = null;

    try {
      in = new BufferedReader(new FileReader(filename));
      while (true) {
        line = in.readLine();
        if (line == null || line.length() == 0) {
          break;
        }
        sBuff = "";
        st = new StringTokenizer(line, "|");
        token = st.nextToken();
        if (token.equals("//")) {
          ;
        }
        else if (token.equals("template")) {
          if (template != null) {
            templates.add(template);
          }
          tempId = Long.parseLong(st.nextToken());
          sBuff += st.nextToken();
          template = new Template(tempId, sBuff);
          sBuff = st.nextToken();
          template.setDescr(sBuff);
          template.setDrawingId(Long.parseLong(st.nextToken()));
        }
        else if (token.equals("detail")) {
          tempId = Long.parseLong(st.nextToken());
          Detail detail = Details.getAttributeDetail(tempId);
          template.addDetail(detail);
        }
      }
      if (template != null) {
        template.setClean(true);
      }
      if (template != null) {
        templates.add(template);
      }
      in.close();
    }
    catch (FileNotFoundException fnfe) {
    	createTemplatesFile(filename);
    }
    catch (IOException ioe) {
    	ioe.printStackTrace();
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
	  Template template = null;

	  try {
	    try {
			InputStream is = url.openStream(); 
			InputStreamReader inR = new InputStreamReader(is) ; 
			in = new BufferedReader(inR) ;
		} catch (IOException e1) {
			e1.printStackTrace();
		}

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
	        else if (token.equals("template")) {
	          if (template != null) {
	        	template.setClean(true);
	            templates.add(template);
	          }
	          tempId = Long.parseLong(st.nextToken());
	          sBuff += st.nextToken();
	          template = new Template(tempId, sBuff);
	          sBuff = st.nextToken();
	          template.setDescr(sBuff);
	          template.setDrawingId(Long.parseLong(st.nextToken()));
	        }
	        else if (token.equals("detail")) {
	          tempId = Long.parseLong(st.nextToken());
	          Detail detail = Details.getAttributeDetail(tempId);
	          template.addDetail(detail);
	        }
	      }
		
	      if (template != null) {
	        template.setClean(true);
	        templates.add(template);
	      }

	      try {
			in.close();
	      } catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
	      }
	  }	catch (NumberFormatException nfe) {
	      	nfe.printStackTrace();
	  } catch (NoSuchElementException nse) {
	    	nse.printStackTrace();
	  }

	  setClean(true);
  }

  public static Template getDetailTemplate(long id) {
    Iterator iter = templates.iterator();
    while (iter.hasNext()) {
    	Object obj = iter.next();
    	if (obj instanceof Template)
    	{
    		Template template = (Template)obj;
    		if (template.getId() == id) {
    			return template;
    		}
    	}
    }
    return null;
  }

  public static Template getDetailTemplate(String name) {
    Iterator iter = templates.iterator();
    while (iter.hasNext()) {
      Template detail = (Template) iter.next();
      if (detail.getName().equals(name)) {
        return detail;
      }
    }
    return null;
  }

  public static Vector getTemplates(Detail detail) {
    Vector used_in = new Vector();
    Enumeration en = templates.elements();
    while (en.hasMoreElements()) {
      Template template = (Template) en.nextElement();
      if (template.getDetails().indexOf(detail) != -1) {
        used_in.add(template);
      }
    }
    return used_in;
  }

  public static void add(Template template) {
    templates.add(template);
    setClean(false);
  }

  public static String[] getTemplateList() {
    String[] names = new String[templates.size()];
    int i;

    for (i = 0; i < templates.size(); i++) {
      Template detail = (Template) templates.get(i);
      names[i] = detail.getName();
    }
    return null;
  }

  public static void toFile() {
    try {
      PrintWriter out = new PrintWriter(new FileWriter(Utils.getProperty("datadrafter.config.templates")));
      Enumeration en = templates.elements();
      while (en.hasMoreElements()) {
        Object obj = en.nextElement();
        System.out.println("template element-> " + obj);
        ((Template)obj).toFile(out);
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
  public static void toXML() {
    //int num_saved = 0;
    String xmldoc = "";
    PrintWriter out = null;

    try {
      xmldoc = "<templates>";
      Enumeration en = templates.elements();
      while (en.hasMoreElements()) {
        Object obj = en.nextElement();
        xmldoc += ((Template)obj).toXML();
      }
      xmldoc += "</templates>";
      out = new PrintWriter(new FileWriter("./config/modeler.xml"));
      out.print(xmldoc);
    }
    catch (IOException ioe) {
    	ioe.printStackTrace();
    }
    finally {
      if (out != null) out.close();
    }
  }
  public void createTemplatesFile(String filename) {
	try {
		FileWriter fw = new FileWriter(filename, true);
		fw.close();
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
	Templates.clean = clean;
  }
}