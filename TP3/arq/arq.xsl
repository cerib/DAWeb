<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <xsl:result-document href="index.html">
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
    </xsl:template>
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="arqueo-{generate-id()}.html">
            <html>
                <head>
                    <title>
                        <xsl:value-of select="IDENTI"/>
                    </title>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <header>
                        <h2>
                            <xsl:value-of select="IDENTI"/> - (<xsl:value-of
                                select="DESCRI"/>) 
                        </h2>
                        <table>
                            <tr>
                                <td>
                                    <b>Lugar: </b>
                                    <xsl:value-of select="LUGAR"/>
                                </td>
                                <td>
                                    <b>Freguesia: </b>
                                    <xsl:value-of select="FREGUE"/>
                                </td>
                                <td>
                                    <b>Concelho: </b>
                                    <xsl:value-of select="CONCEL"/>
                                </td>
                            </tr>
                        </table>
                        <p>
                            <b>Coordenadas (<xsl:value-of select="CODADM"/>): </b>
                            <xsl:value-of select="LATITU"/>Norte - <xsl:value-of select="LONGIT"
                            />Oeste - <xsl:value-of select="ALTITU"/>
                        </p>
                    </header>
                    <p>
                        <b>Accesso: </b>
                        <xsl:value-of select="ACESSO"/>
                        
                    </p>
                        
                    <p>
                        <b>Quadro: </b>
                        <xsl:value-of select="QUADRO"/>
                    </p>
                    <h4>
                        <b>Descrição do arqueossítio: </b>
                    </h4>
                    <p>
                        <xsl:value-of select="DESARQ"/>
                    </p>
                    <p>
                        <b>Intérprete: </b>
                        <xsl:value-of select="INTERP"/>
                    </p>
                    <p>
                        <b>Depósito: </b>
                        <xsl:value-of select="DEPOSI"/>
                    </p>
                    <p>
                        <b>Bibliografia: </b>
                    </p>
                    <ul>
                        <xsl:for-each select="BIBLIO">
                            <li>
                                <xsl:value-of select="."/>
                            </li>    
                        </xsl:for-each>                              
                    </ul>
                    <p><xsl:value-of select="AUTOR"/> - <xsl:value-of select="DATA"/></p>
                    <h3>
                        <a href="index.html#{generate-id()}">Retroceder</a>
                    </h3>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
</xsl:stylesheet>