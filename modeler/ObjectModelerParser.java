package com.datadrafter.modeler;

import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Vector;

import org.xml.sax.Attributes;
import org.xml.sax.InputSource;
import org.xml.sax.Locator;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;
import org.xml.sax.helpers.XMLReaderFactory;

public class ObjectModelerParser
{
    public final static boolean debug;
	//private Vector templates = null;
	
    static
    {
/*        String strDebug = System.getProperty("DEBUG");
        if (strDebug == null)
            strDebug = System.getProperty("debug");

        if (strDebug != null && strDebug.equalsIgnoreCase("true"))
            debug = true;
        else
            debug = false; */
        debug = false; 
    }

    private XMLReader xmlreader;
    private DocHandler docHandler;

    class DocHandler implements org.xml.sax.ContentHandler
    {
    	/** locator object from parser. */
        //private Locator loc;

        /** Vector of addresses. */
        //private Vector members = null;
        /** Current element parsed. */
        //private int currentElement;

        /** current Link Group */
        //private Object    curr_object = null;
        //private LinkGroup curr_linkgroup = null;
        //private DataLink  curr_datalink = null;
        private String    buffer = null;
        
        /** method of the DocumentHandler Interface. */
        public synchronized void characters(char[] ch, int start, int length)
        {
            buffer += new String(ch, start, length);
        }
        public void skippedEntity(String s) {
        }
        /** method of the DocumentHandler Interface. */
        public void startDocument()
        {
            // Receive notification of the beginning of the document.
            if (debug) System.out.println("Called startDocument()");
        }

        /** method of the DocumentHandler Interface. */
        public void endDocument()
        {
            // Receive notification of the end of the document.
            if (debug) System.out.println("Called endDocument()");
        }
        /** method of the DocumentHandler Interface. */
        public void startElement(String namespaceURI, String localName, String qName, Attributes atts)
        {
        }

        /** method of the DocumentHandler Interface. */
        public void endElement(String namespaceURI, String localName, String qName)
        {
        }

        /** method of the DocumentHandler Interface. */
        public void ignorableWhitespace(char[] ch, int start, int length)
        {
            // Receive notification of ignorable whitespace in element content.
//            if (debug) System.out.println("Called ignorableWhitespace(ch:"
//                                          + new String(ch,start,length) +
//                             ",start: " + start + ",length: " + length + ")");
        }

        /** method of the DocumentHandler Interface. */
        public void processingInstruction(java.lang.String target,
                                   java.lang.String data)
        {
            // Receive notification of a processing instruction.
            if (debug) System.out.println("Called processingInstruction(target:"
                                          + target + ",data:" + data + ")");
        }

        /** method of the DocumentHandler Interface. */
        public void setDocumentLocator(Locator locator)
        {
            // Receive a Locator object for document events.
            if (debug) System.out.println("Called setDocumentLocator()");
            //loc = locator;
        }
        public void endPrefixMapping(String prefix) {
        }
        public void startPrefixMapping(String prefix, String uri) {
        }
    }

    public ObjectModelerParser(String filename, Vector templates) throws InstantiationException
    {
    	//this.templates = templates;
    	
        try
        {
          xmlreader = XMLReaderFactory.createXMLReader("org.apache.xerces.parsers.SAXParser");
        } catch (Exception e)
          {
            if (e instanceof InstantiationException)
                throw (InstantiationException) e;
            else
                throw new InstantiationException("Reason:" + e.toString());
          }

        docHandler = new DocHandler();
        xmlreader.setContentHandler(docHandler);
        
		try {
			  InputSource is = new InputSource(filename);
			  this.parse(is);
			} catch (FileNotFoundException fnfe) {
			  createModelerFile(filename);
			} catch (IOException ie) {
			  ie.printStackTrace();
			} catch (SAXException se) {
			  se.printStackTrace();
			}
    }

    /**
      * method to parse an abml file and return a Vector of Address objects.
      * @param is  org.xml.sax.InputSource.
      * @returns A Vector of sams.chp2.Address objects.
      */
    public void parse(InputSource is) throws SAXException, IOException
    {
          xmlreader.parse(is);
    }

	public void createModelerFile(String filename) {
		try {
			new FileWriter(filename, true);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

    /** main() method for unit testing. */
	public static void main(String[] args) {
		Vector templates = new Vector();
		try
        {
            //ObjectModelerParser parser = 
            	new ObjectModelerParser("/datadrafter/config/modeler.xml", templates);
        } catch (Throwable t)
          {
            t.printStackTrace();
          }
    }
}

