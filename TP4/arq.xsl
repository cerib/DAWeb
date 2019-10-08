<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="xml" encoding="UTF-8" indent="yes"/>
    <xsl:template match="ARQELEM">
        <xsl:result-document href="xml/arqueo-{count(preceding-sibling::ARQELEM)+1}.xml">
            <xsl:copy-of select="."></xsl:copy-of>
        </xsl:result-document>
    </xsl:template>
</xsl:stylesheet>