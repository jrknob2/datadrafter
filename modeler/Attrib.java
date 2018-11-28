package com.datadrafter.modeler;

/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2003</p>
 * <p>Company: </p>
 * @author not attributable
 * @version 1.0
 */
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.Vector;

public class Attrib {
  private long id;
  private String name;
  private String descr;

  private boolean clean = true;

  public Attrib(long id, String name, String descr) {
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

  public String toString() {
    return getName();
  }

  public void toXML(PrintWriter out) {
    out.print(toXML());
  }
  public String toXML() {
    return "<attrib>" +
           "<id>" +   getId() + "</id>" +
           "<name>" + getName() + "</name>" +
           "<desc>" + getDescr() + "</desc>" +
           "</attrib>";
  }

  public boolean toFile(PrintWriter out) throws IOException {
//    int min_len = Integer.parseInt(Utils.getProperty(
//        "datadrafter.modeler.attrib.name.minlen"));
    if (this.name.length() < 2) {
      return false;
    }
    out.println("ATTRIB" + "|" + getId() +
                		"|" + getName() +
                		"|" + getDescr());
    clean = true;
    return true;
  }

  public boolean setDataField(String label, Object value) {
    if (label.equals("Name")) {
      setName( (String) value);
    }
    else if (label.equals("Descr")) {
      setDescr( (String) value);
    }
    return clean;
  }

  public Object[][] toTableData() {
    Vector used_in = Details.getDetails(this);
    Object[][] data = new Object[3 + used_in.size()][2];
    
    data[0][0] = "Id";
    data[0][1] = new Long(getId());
    data[1][0] = "Name";
    data[1][1] = getName();
    data[2][0] = "Descr";
    data[2][1] = getDescr();

    int i = 3;
    Iterator iter = used_in.iterator();
    while (iter.hasNext()) {
      Detail detail = (Detail) iter.next();
      data[i][0] = "Used In Detail";
      data[i++][1] = detail;
    }
    return data;
  }
}