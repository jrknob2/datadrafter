package com.datadrafter.modeler;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.util.Iterator;
import java.util.Vector;

import javax.swing.BorderFactory;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTabbedPane;
import javax.swing.JToggleButton;
import javax.swing.JToolBar;
import javax.swing.event.ChangeEvent;

import com.datadrafter.events.ApplicationAction;
import com.datadrafter.reports.ReportArea;
import com.datadrafter.reports.StandardReports;
import com.datadrafter.tables.TableEditor;
import com.datadrafter.utils.Utils;

/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2002</p>
 * <p>Company: </p>
 * @author not attributable
 * @version 1. */

public class ObjectModeler extends JPanel { //implements ObjectActionListener { //GraphicsActionListener, 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	Vector clipboard = new Vector();

	JPanel templateEditorPanel = new JPanel(new BorderLayout());
	JPanel detailEditorPanel = new JPanel(new BorderLayout());
	JPanel attribEditorPanel = new JPanel(new BorderLayout());

	JPanel attribHeaderPanel = new JPanel(new BorderLayout());
	JPanel detailHeaderPanel = new JPanel(new BorderLayout());
	JPanel templateHeaderPanel = new JPanel(new BorderLayout());

	JComboBox templateSelection = new JComboBox(Templates.getTemplates());
	JComboBox detailSelection = new JComboBox(Details.getDetails());
	JComboBox attributeSelection = new JComboBox(Attribs.getAttributes());

	public TableEditor templateTable = new TableEditor(new String[] { "Property", "Value" });
	public TableEditor detailTable = new TableEditor(new String[] { "Property", "Value" });
	public TableEditor attributeTable = new TableEditor(new String[] { "Property", "Value" });

	JToolBar dataToolBar = new JToolBar(JToolBar.HORIZONTAL);
	JToolBar templateToolBar = new JToolBar(JToolBar.HORIZONTAL);
	JToolBar detailToolBar = new JToolBar(JToolBar.HORIZONTAL);
	JToolBar attribToolBar = new JToolBar(JToolBar.HORIZONTAL);

	JButton saveTemplateButton = new JButton();
	JButton exportTemplateButton = new JButton();
	JButton saveDetailButton = new JButton();
	JButton exportDetailButton = new JButton();
	JButton saveAttributeButton = new JButton();
	JButton exportAttributeButton = new JButton();

	JButton newTemplateButton = new JButton();
	JButton newDetailButton = new JButton();
	JButton newAttribButton = new JButton();

	JButton deleteTemplateButton = new JButton();
	JButton deleteDetailButton = new JButton();
	JButton deleteAttribButton = new JButton();

	JButton copyDetailButton = new JButton();
	JButton copyAttribButton = new JButton();

	JButton pasteDetailButton = new JButton();
	JButton pasteAttribButton = new JButton();

	JButton reportTemplateButton = new JButton();

	JToggleButton listAttributesButton = new JToggleButton();
	JToggleButton listDetailsButton = new JToggleButton();

	ImageIcon saveIcon;
	ImageIcon exportIcon;
	ImageIcon newIcon;
	ImageIcon deleteIcon;
	ImageIcon copyIcon;
	ImageIcon pasteIcon;
	ImageIcon listIcon;
	ImageIcon reportIcon;
	ImageIcon moveIcon;
	
	JTabbedPane tab = new JTabbedPane();
//	JLabel header = new JLabel();

	public ObjectModeler() {
		//GraphicsAction.addGraphicsActionListener(this);
		//ObjectAction.addObjectActionListener(this);

		setLayout(new BorderLayout());
		setBorder(BorderFactory.createEmptyBorder());

//		header.setFont(new java.awt.Font("Dialog", 1, 11));
//		header.setBorder(BorderFactory.createRaisedBevelBorder());
//		header.setHorizontalAlignment(SwingConstants.CENTER);
//		header.setText("Object Modeler");

		saveTemplateButton.setToolTipText("Save");
		exportTemplateButton.setToolTipText("Save as XML");
		saveDetailButton.setToolTipText("Save");
		exportDetailButton.setToolTipText("Save as XML");
		saveAttributeButton.setToolTipText("Save");
		exportAttributeButton.setToolTipText("Save as XML");
		
		newTemplateButton.setToolTipText("New Template");
		newDetailButton.setToolTipText("New Detail");
		newAttribButton.setToolTipText("New Attribute");

		deleteTemplateButton.setToolTipText("Delete Template");
		deleteDetailButton.setToolTipText("Delete Detail");
		deleteAttribButton.setToolTipText("Delete Attribute");

		copyDetailButton.setToolTipText("Copy Detail");
		copyAttribButton.setToolTipText("Copy Attribute");

		pasteDetailButton.setToolTipText("Paste Detail");
		pasteAttribButton.setToolTipText("Paste Attribute");

		listAttributesButton.setToolTipText("Choose");
		listDetailsButton.setToolTipText("Choose");

		reportTemplateButton.setToolTipText("Template Report");

		ClassLoader cl = this.getClass().getClassLoader();
		saveIcon = new ImageIcon(cl.getResource("icons/Save16.gif"));
		exportIcon = new ImageIcon(cl.getResource("icons/Export16.gif"));
		newIcon = new ImageIcon(cl.getResource("icons/New16.gif"));
		deleteIcon = new ImageIcon(cl.getResource("icons/Delete16.gif"));
		copyIcon = new ImageIcon(cl.getResource("icons/Copy16.gif"));
		pasteIcon = new ImageIcon(cl.getResource("icons/Paste16.gif"));
		listIcon = new ImageIcon(cl.getResource("icons/listall16.gif"));
		reportIcon = new ImageIcon(cl.getResource("icons/History16.gif"));
		moveIcon = new ImageIcon(cl.getResource("icons/Back16.gif"));

		saveTemplateButton.setIcon(saveIcon);
		exportTemplateButton.setIcon(exportIcon);
		saveDetailButton.setIcon(saveIcon);
		exportDetailButton.setIcon(exportIcon);
		saveAttributeButton.setIcon(saveIcon);
		exportAttributeButton.setIcon(exportIcon);
		newTemplateButton.setIcon(newIcon);
		newDetailButton.setIcon(newIcon);
		newAttribButton.setIcon(newIcon);
		deleteTemplateButton.setIcon(deleteIcon);
		deleteDetailButton.setIcon(deleteIcon);
		deleteAttribButton.setIcon(deleteIcon);
		copyDetailButton.setIcon(copyIcon);
		copyAttribButton.setIcon(copyIcon);
		pasteDetailButton.setIcon(pasteIcon);
		pasteAttribButton.setIcon(pasteIcon);
		listDetailsButton.setIcon(listIcon);
		listAttributesButton.setIcon(listIcon);
		reportTemplateButton.setIcon(reportIcon);

		templateToolBar.add(saveTemplateButton, null);
		templateToolBar.add(exportTemplateButton, null);		
		templateToolBar.add(newTemplateButton, null);
		templateToolBar.add(deleteTemplateButton, null);
		templateToolBar.add(pasteDetailButton, null);
		templateToolBar.add(reportTemplateButton, null);

		detailToolBar.add(saveDetailButton, null);
		detailToolBar.add(exportDetailButton, null);	
		detailToolBar.add(newDetailButton, null);
		detailToolBar.add(deleteDetailButton, null);
		detailToolBar.add(copyDetailButton, null);
		detailToolBar.add(pasteAttribButton, null);
		detailToolBar.add(listDetailsButton, null);

		attribToolBar.add(saveAttributeButton, null);
		attribToolBar.add(exportAttributeButton, null);		
		attribToolBar.add(newAttribButton, null);
		attribToolBar.add(deleteAttribButton, null);
		attribToolBar.add(copyAttribButton, null);
		attribToolBar.add(listAttributesButton, null);

		newAttribButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Attrib attrib = new Attrib(Utils.getUniqueId(), "", "");
				Attribs.add(attrib);
				attributeSelection.setSelectedItem(attrib);
			}
		});
		newDetailButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Detail detail =
					new Detail(Utils.getUniqueId(), "", "");
				Details.add(detail);
				detailSelection.setSelectedItem(detail);
			}
		});
		newTemplateButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Template template =
					new Template(Utils.getUniqueId(), "");
				Templates.add(template);
				templateSelection.setSelectedItem(template);
			}
		});
		deleteAttribButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (attributeTable.getCurrentObject() instanceof Attrib) {
					Attrib attrib =
						(Attrib) attributeTable.getCurrentObject();
					if (attrib == null) {
						return;
					}
					Vector used_in = Details.getDetails(attrib);
					if (used_in.size() > 0) {
						JOptionPane.showMessageDialog(
							null,
							"Attribute " + attrib.getName() + " is in use",
							"Unable to delete",
							JOptionPane.ERROR_MESSAGE);
						return;
					} else {
						Attribs.remove(attrib);
						//ObjectAction.fireObjectActionEvent(
							//this,
							//attrib,
							//ObjectAction.OBJ_MODIFIED);
						if (Attribs.getAttributes().size() > 0) {
							attributeSelection.setSelectedIndex(0);
							attrib =
								(Attrib) attributeSelection
									.getSelectedItem();
							attributeTable.setDataObject(
								attrib,
								attrib.toTableData());
						} else {
							attributeSelection.setSelectedIndex(-1);
							attributeTable.setDataObject(
								null,
								new Object[0][0]);
						}
					}
				}
			}
		});
		deleteDetailButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Detail detail =
					(Detail) detailTable.getCurrentObject();
				if (detail == null) {
					return;
				}
				Vector used_in = Templates.getTemplates(detail);
				if (used_in.size() > 0) {
					JOptionPane.showMessageDialog(
						null,
						"Detail " + detail.getName() + " is in use",
						"Unable to delete",
						JOptionPane.ERROR_MESSAGE);
					return;

				} else {
					Details.remove(detail);
					//ObjectAction.fireObjectActionEvent(
						//this,
						//detail,
						//ObjectAction.OBJ_MODIFIED);
					if (Details.getDetails().size() > 0) {
						detailSelection.setSelectedIndex(0);
						detail =
							(Detail) detailSelection.getSelectedItem();
						detailTable.setDataObject(detail, detail.toTableData());
					} else {
						detailSelection.setSelectedIndex(-1);
						detailTable.setDataObject(null, new Object[0][0]);
					}
				}
			}
		});
		deleteTemplateButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Template template =
					(Template) templateTable.getCurrentObject();
				if (template == null) {
					return;
				}
				Templates.getTemplates().remove(template);
				Templates.setClean(false);
				if (Templates.getTemplates().size() > 0) {
					templateSelection.setSelectedIndex(0);
					template =
						(Template) templateSelection.getSelectedItem();
					templateTable.setDataObject(
						template,
						template.toTableData());
				} else {
					templateSelection.setSelectedIndex(-1);
					templateTable.setDataObject(null, new Object[0][0]);
				}
			}
		});
		saveTemplateButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Templates.toFile();
				Details.toFile();
				Attribs.toFile();
			}
		});
		exportTemplateButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Templates.toXML();
			}
		});
		saveDetailButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Templates.toFile();
				Details.toFile();
				Attribs.toFile();
			}
		});
		exportAttributeButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Templates.toXML();
			}
		});
		saveAttributeButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Templates.toFile();
				Details.toFile();
				Attribs.toFile();
			}
		});
		exportAttributeButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Templates.toXML();
			}
		});
		copyAttribButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (listAttributesButton.isSelected()) {
					int num_rows =
						attributeTable.getTable().getModel().getRowCount();
					if (num_rows > 0) {
						clipboard.clear();
					}
					for (int i = 0; i < num_rows; ++i) {
						Boolean selected =
							(Boolean) attributeTable.getTable().getValueAt(
								i,
								1);
						if (selected.booleanValue()) {
							Attrib attrib =
								(Attrib) attributeTable
									.getTable()
									.getValueAt(
									i,
									0);
							clipboard.add(attrib);
						}
					}
				} else {
					clipboard.clear();
					clipboard.add(attributeSelection.getSelectedItem());
				}
			}
		});
		copyDetailButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (listDetailsButton.isSelected()) {
					int num_rows =
						detailTable.getTable().getModel().getRowCount();
					if (num_rows > 0) {
						clipboard.clear();
					}
					for (int i = 0; i < num_rows; ++i) {
						Boolean selected =
							(Boolean) detailTable.getTable().getValueAt(i, 1);
						if (selected.booleanValue()) {
							Detail detail =
								(Detail) detailTable
									.getTable()
									.getValueAt(
									i,
									0);
							clipboard.add(detail);
						}
					}
				} else {
					clipboard.clear();
					clipboard.add(detailSelection.getSelectedItem());
				}
			}
		});
		pasteAttribButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				int min_len =
					Integer.parseInt(
						Utils.getProperty(
							"datadrafter.modeler.attrib.name.minlen"));
				if (detailTable.getCurrentObject()
					instanceof Detail) {
					if (clipboard.size() < 1) {
						return;
					}
					Detail detail =
						(Detail) detailTable.getCurrentObject();
					if (detail == null) {
						return;
					}
					Iterator iter = clipboard.iterator();
					while (iter.hasNext()) {
						Object obj = iter.next();
						if (obj instanceof Attrib) {
							Attrib attrib = (Attrib) obj;
							if (attrib.getName().length() < min_len) {
								continue;
							}
							if (detail.getAttributes().indexOf(attrib) == -1) {
								boolean modified = detail.addAttribute(attrib);
								if (modified) {
									//ObjectAction.fireObjectActionEvent(
										//this,
										//detail,
										//ObjectAction.OBJ_MODIFIED);
								}
								detailTable.setDataObject(
									detail,
									detail.toTableData());
							}
						}
					}
				}
			}
		});
		pasteDetailButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (clipboard.size() < 1) {
					return;
				}
				Iterator iter = clipboard.iterator();
				while (iter.hasNext()) {
					Object obj = iter.next();
					if (obj instanceof Detail) {
						Detail detail = (Detail) obj;
						Template template =
							(Template) templateTable.getCurrentObject();
						if (template.getDetails().indexOf(detail) == -1) {
							boolean modified = template.addDetail(detail);
							if (modified) {
								//ObjectAction.fireObjectActionEvent(
									//this,
									//template,
									//ObjectAction.OBJ_MODIFIED);
							}
							templateTable.setDataObject(
								template,
								template.toTableData());
						}
					}
				}
			}
		});
		listAttributesButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (listAttributesButton.isSelected()) {
					attributeTable.setDataObject(
						Attribs.getAttributes(),
						Attribs.toTableData());
				} else {
					Attrib attrib =
						(Attrib) attributeSelection.getSelectedItem();
					if (attrib == null) {
						return;
					}
					attributeTable.getTable().setColumns(
						new String[] { "Attribute", "Selected" });
					attributeTable.setDataObject(attrib, attrib.toTableData());
				}
			}
		});
		listDetailsButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (listDetailsButton.isSelected()) {
					detailTable.setDataObject(
						Details.getDetails(),
						Details.toTableData());
				} else {
					Detail detail =
						(Detail) detailSelection.getSelectedItem();
					if (detail == null) {
						return;
					}
					detailTable.getTable().setColumns(
						new String[] { "Detail", "Selected" });
					detailTable.setDataObject(detail, detail.toTableData());
				}
			}
		});
		reportTemplateButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Template template =	(Template) templateTable.getCurrentObject();
				if (template == null) return;
				
				StandardReports summary = new StandardReports(template);
				ReportArea report = new ReportArea(summary.title, summary.generateHTML(template));
				ApplicationAction.fireApplicationActionEvent(this, report, ApplicationAction.NEW_REPORT);
			}
		});

		attribHeaderPanel.add(attribToolBar, BorderLayout.NORTH);
		attribHeaderPanel.add(attributeSelection, BorderLayout.SOUTH);

		attribEditorPanel.add(attribHeaderPanel, BorderLayout.NORTH);
		attribEditorPanel.add(attributeTable, BorderLayout.CENTER);

		detailHeaderPanel.add(detailToolBar, BorderLayout.NORTH);
		detailHeaderPanel.add(detailSelection, BorderLayout.SOUTH);

		detailEditorPanel.add(detailHeaderPanel, BorderLayout.NORTH);
		detailEditorPanel.add(detailTable, BorderLayout.CENTER);

		templateHeaderPanel.add(templateToolBar, BorderLayout.NORTH);
		templateHeaderPanel.add(templateSelection, BorderLayout.SOUTH);

		templateEditorPanel.add(templateHeaderPanel, BorderLayout.NORTH);
		templateEditorPanel.add(templateTable, BorderLayout.CENTER);

		Attrib attrib = (Attrib) attributeSelection.getSelectedItem();
		if (attrib != null) {
			attributeTable.setDataObject(attrib, attrib.toTableData());

		}
		Detail detail =
			(Detail) detailSelection.getSelectedItem();
		if (detail != null) {
			detailTable.setDataObject(detail, detail.toTableData());

		}
		Template template =
			(Template) templateSelection.getSelectedItem();
		if (template != null) {
			templateTable.setDataObject(template, template.toTableData());

		}
		tab.add(templateEditorPanel, "Templates");
		tab.add(detailEditorPanel, "Details");
		tab.add(attribEditorPanel, "Attributes");

		attributeSelection.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Attrib attrib = (Attrib) attributeSelection.getSelectedItem();
				if (attrib == null) {
					return;
				}
				attributeTable.setDataObject(attrib, attrib.toTableData());
				listAttributesButton.setSelected(false);
			}
		});
		detailSelection.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				detailTable.setDataObject(null, new Object[0][0]);
				Detail detail = (Detail) detailSelection.getSelectedItem();
				if (detail == null) {
					return;
				}
				detailTable.setDataObject(detail, detail.toTableData());
				listDetailsButton.setSelected(false);
			}
		});
		templateSelection.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Template template = (Template) templateSelection.getSelectedItem();
				if (template == null) {
					return;
				}
				templateTable.setDataObject(template, template.toTableData());
			}
		});

		tab.addChangeListener(new javax.swing.event.ChangeListener() {
			public void stateChanged(ChangeEvent e) {
				Utils.tabStateChanged(tab);
			}
		});

		tab.setTabLayoutPolicy(JTabbedPane.SCROLL_TAB_LAYOUT);

		//add(header, BorderLayout.NORTH);
		add(tab, BorderLayout.CENTER);

		Utils.tabStateChanged(tab);
	}
	public void refreshTemplateData() {
		Template template = (Template)templateTable.getCurrentObject();
		templateTable.setDataObject(template, template.toTableData());
	}		
}
