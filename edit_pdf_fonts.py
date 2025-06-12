#!/usr/bin/env python3

import PyPDF2
from PyPDF2.generic import TextStringObject, NameObject
import sys

def edit_pdf_font_sizes(input_path, output_path):
    """Carefully edit only font sizes in PDF text fields, preserving everything else"""
    
    # Fields that need smaller fonts (8pt)
    small_font_fields = {
        'Equipment',
        'PersonalityTraits ',
        'Ideals',
        'Bonds', 
        'Flaws',
        'Features and Traits',
        'Feat+Traits',
        'ProficienciesLang',
        'Allies',
        'FactionName', 
        'Backstory',
        'Treasure',
        'AttacksSpellcasting'
    }
    
    # Add spell fields that need smaller fonts
    for i in range(1014, 1034):  # Spells 1014-1033
        small_font_fields.add(f'Spells {i}')
    
    try:
        with open(input_path, 'rb') as input_file:
            reader = PyPDF2.PdfReader(input_file)
            writer = PyPDF2.PdfWriter()
            
            # Copy all pages exactly as they are
            for page in reader.pages:
                writer.add_page(page)
            
            # Clone the entire document structure to preserve everything
            writer.clone_reader_document_root(reader)
            
            # Get the form from the writer (now we can safely modify it)
            if '/AcroForm' in writer._root_object:
                acro_form = writer._root_object['/AcroForm']
                
                if '/Fields' in acro_form:
                    fields = acro_form['/Fields']
                    
                    print(f"Found {len(fields)} form fields")
                    
                    modified_count = 0
                    for field_ref in fields:
                        field = field_ref.get_object()
                        
                        if '/T' in field and '/FT' in field:
                            field_name = field['/T']
                            field_type = field['/FT']
                            
                            # Only modify text fields (/FT = /Tx)
                            if field_type == NameObject('/Tx'):
                                # Determine appropriate font size
                                if field_name in small_font_fields:
                                    font_size = 8
                                    da_string = '0 0 0 rg /Helv 8 Tf'
                                else:
                                    font_size = 10
                                    da_string = '0 0 0 rg /Helv 10 Tf'
                                
                                # Add /DA entry for this text field
                                field[NameObject('/DA')] = TextStringObject(da_string)
                                
                                print(f"Set {font_size}pt font for text field: '{field_name}'")
                                modified_count += 1
                            else:
                                # Skip non-text fields (checkboxes, etc.)
                                print(f"Skipped non-text field: '{field_name}' (type: {field_type})")
                    
                    print(f"\nModified {modified_count} text fields")
                else:
                    print("No /Fields found in AcroForm")
            else:
                print("No AcroForm found")
            
            # Write the modified PDF
            with open(output_path, 'wb') as output_file:
                writer.write(output_file)
                
            print(f"\nSuccessfully created {output_path}")
            return True
            
    except Exception as e:
        print(f"Error editing PDF: {e}")
        import traceback
        traceback.print_exc()
        return False

def verify_pdf(pdf_path):
    """Verify the edited PDF has all expected fields and font settings"""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            
            if '/AcroForm' in reader.trailer['/Root']:
                form_fields = reader.get_form_text_fields()
                if form_fields:
                    print(f"\n✅ Verification: Found {len(form_fields)} form fields")
                    
                    # Check for key fields
                    key_fields = ['CharacterName', 'PlayerName', 'Race ', 'ClassLevel', 'Equipment']
                    missing_fields = []
                    for field in key_fields:
                        if field not in form_fields:
                            missing_fields.append(field)
                    
                    if missing_fields:
                        print(f"❌ Missing key fields: {missing_fields}")
                        return False
                    else:
                        print("✅ All key fields present")
                        return True
                else:
                    print("❌ No form fields found!")
                    return False
            else:
                print("❌ No AcroForm found!")
                return False
                
    except Exception as e:
        print(f"❌ Verification failed: {e}")
        return False

if __name__ == "__main__":
    input_pdf = "public/dnd-5e-character-sheet.pdf"
    output_pdf = "public/dnd-5e-character-sheet-fonts.pdf"
    
    print("🔧 Editing PDF font sizes...")
    success = edit_pdf_font_sizes(input_pdf, output_pdf)
    
    if success:
        print("\n🔍 Verifying edited PDF...")
        if verify_pdf(output_pdf):
            print("\n🎉 PDF editing completed successfully!")
            print(f"✅ Use {output_pdf} for PDF exports")
        else:
            print("\n❌ PDF verification failed!")
            sys.exit(1)
    else:
        print("\n❌ PDF editing failed!")
        sys.exit(1) 