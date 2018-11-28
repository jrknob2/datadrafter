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

import com.datadrafter.xcad.CadDrawing;
import com.datadrafter.utils.Utils;

public class Template {
  private long    id        = -1;
  private String  name      = "";
  private String  descr	    = "";
  private long    drawingId = -1;
  private Vector  details   = new Vector();
  private Vector  removed   = new Vector();
  private boolean clean     = true;

  public Template(long id, String name) {
    this.id = id;
    this.name = name;
  }

  public void setClean(boolean clean) {
    this.clean = clean;
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

  public long getDrawingId() {
    return drawingId;
  }

  protected void setDrawingId(long drawingId) {
    if (this.drawingId == drawingId) {
      return;
    }
    this.drawingId = drawingId;
    clean = false;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    if (this.name.equals(name)) {
      if (getDescr() == null) setDescr(name);
      return;
    }
    this.name = name;
    if (getDescr().equals("")) setDescr(name);    
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

  public boolean addDetail(Detail detail) {
    if (details.indexOf(detail) != -1) {
      return false;
    }
    details.add(detail);
    clean = false;
    return true;
  }

  public boolean setDataField(Object obj, Object value) {
    if (obj instanceof Detail) {
      Detail detail = (Detail) obj;
      if ( ( (Boolean) value).booleanValue()) {
        removed.remove(detail);
        clean = false;
      }
      else {
        removed.add(detail);
      }
    } else {
      String label = (String) obj;
      if (label.equals("Name")) {
        setName( (String) value);
      } else if (label.equals("Descr")) {
        setDescr( (String) value);
      }
      
      else if (label.equals("Drawing ID")) {
    	String svalue = (String)value;
    	int index = svalue.indexOf(".");
    	if (index != -1) svalue = svalue.substring(0, index);
    	long id = svalue.length() == 0 ? -1 : Long.parseLong(svalue);
        setDrawingId(id);
        clean = false;
        //ObjectAction.fireObjectActionEvent(this, this, ObjectAction.OBJ_MODIFIED);
      }
    }
    return clean;
  }

  public Object[][] toTableData() {
    Iterator iter = removed.iterator();
    while (iter.hasNext()) {
      Detail detail = (Detail) iter.next();
      details.remove(detail);
    }
    removed.clear();

    Object[][] data = new Object[details.size() + 5][2];

    data[0][0] = "Id";
    data[0][1] = Long.valueOf(Long.toString(getId()));
    data[1][0] = "Name";
    data[1][1] = getName();
    data[2][0] = "Descr";
    data[2][1] = getDescr();   
    data[3][0] = "Drawing ID";
    data[3][1] = new Long(getDrawingId());
    data[4][0] = "Preview";
    if (getDrawingId() == -1) {
      data[4][1] = "Not Specified";
    }
    else {
      data[4][1] = new CadDrawing(drawingId);
    }
    iter = details.iterator();
    int i = 5;
    while (iter.hasNext()) {
      Detail detail = (Detail) iter.next();
      data[i][0] = detail;
      data[i++][1] = new Boolean(true);
    }
    return data;
  }

  public String toString() {
    return name;
  }

  public Vector getDetails() {
    return details;
  }

  public void toXML(PrintWriter out) {
    out.print(toXML());
  }
  public String toXML() {
    String xml = "<template>" +
                 "<id>"   + getId() + "</id>" +
                 "<name>" + getName() + "</name>" +
                 "<descr>" + getDescr() + "</descr>";
    Iterator iter = details.iterator();
    while (iter.hasNext()) {
      Detail detail = (Detail) iter.next();
      xml += "<detail>" + detail.getId() + "<detail/>"; 
    }
    xml += "</template>";
    return xml;
  }

  public boolean toFile(PrintWriter out) {
    int min_len = Integer.parseInt(Utils.getProperty(
        "datadrafter.modeler.attrib.name.minlen"));
    if (this.name.length() < min_len) {
      return false;
    }

    out.println("template" + "|" + getId() +
                             "|" + getName()+
                             "|" + getDescr() +
							 "|" + getDrawingId());
    Iterator iter = details.iterator();
    while (iter.hasNext()) {
      Detail detail = (Detail) iter.next();
      if (detail != null) {
    	  out.println("detail" + "|" + detail.getId());
      }
    }
    clean = true;
    return true;
  }
}
