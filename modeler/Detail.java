package com.datadrafter.modeler;

/**
 * Title:
 * Description:
 * Copyright:    Copyright (c) 2002
 * Company:
 * @author
 * @version 1.0
 */

import java.io.PrintWriter;
import java.util.Iterator;
import java.util.Vector;

import com.datadrafter.utils.Utils;

public class Detail {
  private long id;
  private String name = null;
  private String descr = null;
  private Vector attribs = new Vector();
  private Vector removed = new Vector();
  private boolean clean = true;

  public Detail(long id, String name, String descr) {
    this.id = id;
    this.name = name;
    this.descr = descr;
  }

  public long getId() {
    return id;
  }

  protected void setId(long id) {
    if (this.id == id) {
      return;
    }
    this.id = id;
    clean = false;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    if (this.name.equals(name)) {
      return;
    }
    this.name = name;
    if (descr == "") {
        setDescr(name);
      }
    clean = false;
  }

  public String getDescr() {
	  return descr;
  }

  public void setDescr(String descr) {
    if (this.descr.equals(descr)) {
      return;
    }
    this.descr = descr;
    clean = false;
  }

  public void setClean(boolean clean) {
    this.clean = clean;
  }

  public boolean addAttribute(Attrib attrib) {
    int i = attribs.indexOf(attrib);
    if (i != -1) {
      return false;
    }
    attribs.add(attrib);
    clean = false;
    return true;
  }

  public Vector getAttributes() {
    return attribs;
  }

  public Attrib getAttribute(long attribId) {
    Iterator iter = attribs.iterator();
    while (iter.hasNext()) {
      Attrib attrib = (Attrib) iter.next();
      if (attrib.getId() == attribId) {
        return attrib;
      }
    }
    return null;
  }

  public void toXML(PrintWriter out) {
    out.print(toXML());
  }
  public String toXML() {
    String xml = "<detail>" +
                 "<id>" + getId() + "</id>" +
                 "<name>" + getName() + "</name>" +
                 "<descr>" + getDescr() + "</descr>";

    Iterator iter = attribs.iterator();
    while (iter.hasNext()) {
      Attrib attrib = (Attrib) iter.next();
      if (removed.indexOf(attrib) == -1) {
        xml += attrib.toXML();
      }
    }
    xml += "</detail>";
    return xml;
  }

  public boolean toFile(PrintWriter out) {
    int min_len = Integer.parseInt(Utils.getProperty(
        "datadrafter.modeler.attrib.name.minlen"));
    if (this.name.length() < min_len) {
      return false;
    }

    out.println("detail" + "|" + getId() +
                		"|" + getName() +
                		"|" + getDescr());
    
    Iterator iter = attribs.iterator();
    while (iter.hasNext()) {
      Attrib attrib = (Attrib) iter.next();
      if (removed.indexOf(attrib) == -1) {
        out.println("attrib" + "|" + attrib.getId() +
                    		   "|" + attrib.getName());
      }
    }
    out.flush();
    clean = true;
    return true;
  }

  public boolean setDataField(Object obj, Object value) {
    if (obj instanceof Attrib) {
      Attrib attrib = (Attrib) obj;
      if ( ( (Boolean) value).booleanValue()) {
        removed.remove(attrib);
        clean = false;
      }
      else {
        removed.add(attrib);
        clean = false;
      }
    }
    else {
      String label = (String) obj;
      if (label.equals("Name")) {
        setName((String)value);
      } else if (label.equals("Descr")) {
    	setDescr((String)value);
      }
    }
    return clean;
  }

  public Object[][] toTableData() {
    Iterator iter = removed.iterator();
    while (iter.hasNext()) {
      Attrib attrib = (Attrib) iter.next();
      attribs.remove(attrib);
    }
    removed.clear();
    
    Vector used_in = Templates.getDetailTemplates(this);
    Object[][] data = new Object[3 + attribs.size() + used_in.size()][2];

    data[0][0] = "Id";
    data[0][1] = new Long(getId());
    data[1][0] = "Name";
    data[1][1] = getName();
    data[2][0] = "Descr";
    data[2][1] = getDescr();

    int i = 3;
    iter = attribs.iterator();
    while (iter.hasNext()) {
      Attrib attrib = (Attrib) iter.next();
      data[i][0] = attrib;
      data[i++][1] = new Boolean(true);
    }
    
    iter = used_in.iterator();
    while (iter.hasNext()) {
      Template template = (Template)iter.next();
      data[i][0] = "Used In Template";
      data[i++][1] = template;
    }
    return data;
  }

  public String toString() {
    return getName();
  }
}
