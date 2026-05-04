import os
import re

directory = r"C:\Users\conan\Desktop\化粧品サイト用"
files = [f"product{i}.html" for i in range(1, 8)]

footer_links_html = """        <div class="footer-links container">
            <a href="about.html">会社概要</a>
            <a href="philosophy.html">企業理念</a>
            <a href="contact.html">お問い合わせ</a>
        </div>"""

for filename in files:
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Insert links before copyright
    if '<div class="footer-links' not in content:
        content = re.sub(r'<footer class="site-footer">(\s+)<div class="copyright-text">', 
                        r'<footer class="site-footer">\1' + footer_links_html + r'\1<div class="copyright-text">', 
                        content)
    
    # Also ensure footer styles are present (though they are in style.css, some pages have internal styles)
    # The internal styles for .site-footer in product pages might need adjustment to not have padding: 40px but 40px 0
    content = content.replace('padding: 40px;', 'padding: 40px 0;')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated footer in all product pages.")
