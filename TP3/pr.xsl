<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <xsl:result-document href="pr.html">
            <html>
                <head>
                    <title>Project Record</title>
                    <meta charset="UTF8"/>
                </head>
                <body>
                    <xsl:apply-templates/>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="metadata">
        <h1><xsl:value-of select="keyname"/> - <xsl:value-of select="title"/></h1>
        <table>
            <tr>
                <td><b>Key name: </b> <xsl:value-of select="keyname"/></td>
                <td><b>Begin date: </b><xsl:value-of select="bdate"/></td>
            </tr>
            <tr>
                <td><b>Title: </b> <xsl:value-of select="title"/></td>
                <td><b>End date: </b><xsl:value-of select="edate"/></td>
            </tr>
            <xsl:choose>
                <xsl:when test="subtitle">
                    <tr>
                        <td><b>Subtitle: </b> <xsl:value-of select="subtitle"/></td>
                        <td><b>Supervisor: </b> <xsl:value-of select="supervisor"/></td>
                    </tr>
                </xsl:when>
                <xsl:otherwise>
                    <tr>
                        <td></td>
                        <td><b>Supervisor: </b> <xsl:value-of select="supervisor"/></td>
                    </tr>
                </xsl:otherwise>
            </xsl:choose>
        </table>
        <hr/>
    </xsl:template>
    
    <xsl:template match="workteam">
        <ul>
            <xsl:for-each select="worker">
                <li>
                    <p>Nome: <xsl:value-of select="name"/></p>
                    <p>Número: <xsl:value-of select="identifier"/></p>
                    <p>Email: <xsl:value-of select="email"/></p>
                </li>
            </xsl:for-each>  
        </ul>
    </xsl:template>
    
    <xsl:template match="abstract/p">
        <p><xsl:copy-of select = "." /></p>
    </xsl:template>
</xsl:stylesheet>