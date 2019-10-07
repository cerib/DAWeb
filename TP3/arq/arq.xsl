<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <xsl:result-document href="html/index.html">
            <html>
                <head>
                    <title>Arqueo-sítios</title>
                    <meta charset="UTF8"/>
                </head>
                <body>
                    <h1>Arquivo de Arqueo-sítios de Portugal</h1>
                    <h3>Índice de Cidades</h3>
                    <ol>
                        <xsl:apply-templates mode="indice"/>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="{generate-id()}"/>
            <a href="arqueo-{generate-id()}.html"><xsl:value-of select="IDENTI"/></a>
        </li>
        <xsl:variable name="identi" select="IDENTI"/>
        <xsl:result-document href="html/arqueo-{generate-id()}.html">
            <html>
                <head>
                    <title>Arqueo-sítios</title>
                    <meta charset="UTF8"/>
                </head>
                <body>
                    <xsl:apply-templates mode="in-cidade"/>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="in-cidade">
        https://stackoverflow.com/questions/2167444/xsl-passing-variables-between-templates
        <p><xsl:value-of select="$identi"/></p>
    </xsl:template>
</xsl:stylesheet>