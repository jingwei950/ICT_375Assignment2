<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" indent="yes"/>

  <xsl:template match="/">
	<html>
	<link rel="stylesheet" href="styles.css"/>
		<body>    	
			<h3>
				<xsl:apply-templates select="course/name"/>		
			</h3>
			<h3>
				<xsl:apply-templates select="course/duration"/>
			</h3>
			
			<table>
				<tr>
					<th>
						Units
					</th>
					<th>
						Lecturer's Other Name
					</th>
					<th>
						Lecturer's Surname
					</th>
					<th>
						Email
					</th>
				</tr>			
				<xsl:for-each select="course/unit">	
					<tr>					
						<td>
							<xsl:value-of select="title"/>
						</td>
						
						<xsl:choose>						
						  <xsl:when test="lecturer/othernames">
							<td>
								<xsl:value-of select="lecturer/othernames"/>							
							</td>
							<td>
								<xsl:value-of select="lecturer/surname"/>									
							</td>
						  </xsl:when>
						  
						  <xsl:otherwise>
							<td>
								<xsl:text>N/A</xsl:text>
							</td>
							<td>	
								<xsl:value-of select="lecturer/surname"/>						
							</td>
						  </xsl:otherwise>
						</xsl:choose>											
						<xsl:choose>						
						  <xsl:when test="lecturer/email">
							<td>
								<xsl:value-of select="lecturer/email"/>							
							</td>
						  </xsl:when>
						  
						  <xsl:otherwise>
							<td>
								<xsl:text>N/A</xsl:text>
							</td>
						  </xsl:otherwise>
						</xsl:choose>	

					</tr>
				</xsl:for-each>			
			</table>
		</body>
    </html>
  </xsl:template>
</xsl:stylesheet>
