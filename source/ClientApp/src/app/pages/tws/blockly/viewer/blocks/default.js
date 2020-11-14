/*Blockly.Blocks["field_generic"] =
{
	init: function()
	{
		this.appendDummyInput().appendField('simple turtle');
		//this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField(new CustomFields.FieldTurtle(), 'TURTLE');
		//this.setStyle('loop_blocks');
		this.setCommentText('Demonstrates a turtle field with no validator.');
	 }
}*/
toolboxXml = `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
<category name="Logic" colour="%{BKY_LOGIC_HUE}">
  <block type="controls_if"></block>
  <block type="logic_compare"></block>
  <block type="logic_operation"></block>
  <block type="logic_negate"></block>
  <block type="logic_boolean"></block>
  <block type="logic_null"></block>
  <block type="logic_ternary"></block>
</category>
<category name="Loops" colour="%{BKY_LOOPS_HUE}">
  <block type="controls_repeat_ext">
	 <value name="TIMES">
		<shadow type="math_number">
		  <field name="NUM">10</field>
		</shadow>
	 </value>
  </block>
  <block type="controls_whileUntil"></block>
  <block type="controls_for">
	 <value name="FROM">
		<shadow type="math_number">
		  <field name="NUM">1</field>
		</shadow>
	 </value>
	 <value name="TO">
		<shadow type="math_number">
		  <field name="NUM">10</field>
		</shadow>
	 </value>
	 <value name="BY">
		<shadow type="math_number">
		  <field name="NUM">1</field>
		</shadow>
	 </value>
  </block>
  <block type="controls_forEach"></block>
  <block type="controls_flow_statements"></block>
</category>
<category name="Math" colour="%{BKY_MATH_HUE}">
  <block type="math_number">
	 <field name="NUM">123</field>
  </block>
  <block type="math_arithmetic">
	 <value name="A">
		<shadow type="math_number">
		  <field name="NUM">1</field>
		</shadow>
	 </value>
	 <value name="B">
		<shadow type="math_number">
		  <field name="NUM">1</field>
		</shadow>
	 </value>
  </block>
  <block type="math_single">
	 <value name="NUM">
		<shadow type="math_number">
		  <field name="NUM">9</field>
		</shadow>
	 </value>
  </block>
  <block type="math_trig">
	 <value name="NUM">
		<shadow type="math_number">
		  <field name="NUM">45</field>
		</shadow>
	 </value>
  </block>
  <block type="math_constant"></block>
  <block type="math_number_property">
	 <value name="NUMBER_TO_CHECK">
		<shadow type="math_number">
		  <field name="NUM">0</field>
		</shadow>
	 </value>
  </block>
  <block type="math_round">
	 <value name="NUM">
		<shadow type="math_number">
		  <field name="NUM">3.1</field>
		</shadow>
	 </value>
  </block>
  <block type="math_on_list"></block>
  <block type="math_modulo">
	 <value name="DIVIDEND">
		<shadow type="math_number">
		  <field name="NUM">64</field>
		</shadow>
	 </value>
	 <value name="DIVISOR">
		<shadow type="math_number">
		  <field name="NUM">10</field>
		</shadow>
	 </value>
  </block>
  <block type="math_constrain">
	 <value name="VALUE">
		<shadow type="math_number">
		  <field name="NUM">50</field>
		</shadow>
	 </value>
	 <value name="LOW">
		<shadow type="math_number">
		  <field name="NUM">1</field>
		</shadow>
	 </value>
	 <value name="HIGH">
		<shadow type="math_number">
		  <field name="NUM">100</field>
		</shadow>
	 </value>
  </block>
  <block type="math_random_int">
	 <value name="FROM">
		<shadow type="math_number">
		  <field name="NUM">1</field>
		</shadow>
	 </value>
	 <value name="TO">
		<shadow type="math_number">
		  <field name="NUM">100</field>
		</shadow>
	 </value>
  </block>
  <block type="math_random_float"></block>
  <block type="math_atan2">
	 <value name="X">
		<shadow type="math_number">
		  <field name="NUM">1</field>
		</shadow>
	 </value>
	 <value name="Y">
		<shadow type="math_number">
		  <field name="NUM">1</field>
		</shadow>
	 </value>
  </block>
</category>
<category name="Text" colour="%{BKY_TEXTS_HUE}">
  <block type="text"></block>
  <block type="text_join"></block>
  <block type="text_append">
	 <value name="TEXT">
		<shadow type="text"></shadow>
	 </value>
  </block>
  <block type="text_length">
	 <value name="VALUE">
		<shadow type="text">
		  <field name="TEXT">abc</field>
		</shadow>
	 </value>
  </block>
  <block type="text_isEmpty">
	 <value name="VALUE">
		<shadow type="text">
		  <field name="TEXT"></field>
		</shadow>
	 </value>
  </block>
  <block type="text_indexOf">
	 <value name="VALUE">
		<block type="variables_get">
		  <field name="VAR">{textVariable}</field>
		</block>
	 </value>
	 <value name="FIND">
		<shadow type="text">
		  <field name="TEXT">abc</field>
		</shadow>
	 </value>
  </block>
  <block type="text_charAt">
	 <value name="VALUE">
		<block type="variables_get">
		  <field name="VAR">{textVariable}</field>
		</block>
	 </value>
  </block>
  <block type="text_getSubstring">
	 <value name="STRING">
		<block type="variables_get">
		  <field name="VAR">{textVariable}</field>
		</block>
	 </value>
  </block>
  <block type="text_changeCase">
	 <value name="TEXT">
		<shadow type="text">
		  <field name="TEXT">abc</field>
		</shadow>
	 </value>
  </block>
  <block type="text_trim">
	 <value name="TEXT">
		<shadow type="text">
		  <field name="TEXT">abc</field>
		</shadow>
	 </value>
  </block>
  <block type="text_print">
	 <value name="TEXT">
		<shadow type="text">
		  <field name="TEXT">abc</field>
		</shadow>
	 </value>
  </block>
  <block type="text_prompt_ext">
	 <value name="TEXT">
		<shadow type="text">
		  <field name="TEXT">abc</field>
		</shadow>
	 </value>
  </block>
</category>
<category name="Lists" colour="%{BKY_LISTS_HUE}">
  <block type="lists_create_with">
	 <mutation items="0"></mutation>
  </block>
  <block type="lists_create_with"></block>
  <block type="lists_repeat">
	 <value name="NUM">
		<shadow type="math_number">
		  <field name="NUM">5</field>
		</shadow>
	 </value>
  </block>
  <block type="lists_length"></block>
  <block type="lists_isEmpty"></block>
  <block type="lists_indexOf">
	 <value name="VALUE">
		<block type="variables_get">
		  <field name="VAR">{listVariable}</field>
		</block>
	 </value>
  </block>
  <block type="lists_getIndex">
	 <value name="VALUE">
		<block type="variables_get">
		  <field name="VAR">{listVariable}</field>
		</block>
	 </value>
  </block>
  <block type="lists_setIndex">
	 <value name="LIST">
		<block type="variables_get">
		  <field name="VAR">{listVariable}</field>
		</block>
	 </value>
  </block>
  <block type="lists_getSublist">
	 <value name="LIST">
		<block type="variables_get">
		  <field name="VAR">{listVariable}</field>
		</block>
	 </value>
  </block>
  <block type="lists_split">
	 <value name="DELIM">
		<shadow type="text">
		  <field name="TEXT">,</field>
		</shadow>
	 </value>
  </block>
  <block type="lists_sort"></block>
</category>
<category name="Colour" colour="%{BKY_COLOUR_HUE}">
  <block type="colour_picker"></block>
  <block type="colour_random"></block>
  <block type="colour_rgb">
	 <value name="RED">
		<shadow type="math_number">
		  <field name="NUM">100</field>
		</shadow>
	 </value>
	 <value name="GREEN">
		<shadow type="math_number">
		  <field name="NUM">50</field>
		</shadow>
	 </value>
	 <value name="BLUE">
		<shadow type="math_number">
		  <field name="NUM">0</field>
		</shadow>
	 </value>
  </block>
  <block type="colour_blend">
	 <value name="COLOUR1">
		<shadow type="colour_picker">
		  <field name="COLOUR">#ff0000</field>
		</shadow>
	 </value>
	 <value name="COLOUR2">
		<shadow type="colour_picker">
		  <field name="COLOUR">#3333ff</field>
		</shadow>
	 </value>
	 <value name="RATIO">
		<shadow type="math_number">
		  <field name="NUM">0.5</field>
		</shadow>
	 </value>
  </block>
</category>
<sep></sep>
<category name="Variables" colour="%{BKY_VARIABLES_HUE}" custom="VARIABLE"></category>
<category name="Functions" colour="%{BKY_PROCEDURES_HUE}" custom="PROCEDURE"></category>
<category name="Orders" colour="%{BKY_PROCEDURES_HUE}">
	<variables>
		<variable id="8[D9Dpiw?f~TGJB4)3I{">order</variable>
		<variable id="Evm2MWUn3m:Dv7TVUbL3">underlyingTick</variable>
		<variable id="].hI)iTqdw1taXG1Ota3">optionTick</variable>
	</variables>
	<block type="procedures_defnoreturn" id="raynU}V+9}uLb$q39r!^" x="188" y="237">
		<mutation>
			<arg name="order" varid="8[D9Dpiw?f~TGJB4)3I{"></arg>
			<arg name="underlyingTick" varid="Evm2MWUn3m:Dv7TVUbL3"></arg>
			<arg name="optionTick" varid="].hI)iTqdw1taXG1Ota3"></arg>
		</mutation>
		<field name="NAME">OnOptionOrder</field>
	</block>
</category>
<category name="Utilities" colour="%{BKY_PROCEDURES_HUE}">
	<variables>
		<variable id="x2~nA$2#vj{~DeifX2[B">detail</variable>
	</variables>
  	<block type="procedures_defreturn" id="r^oT@eD7RsbM/3F6BEh+" x="187" y="363">
    	<mutation statements="false">
      	<arg name="detail" varid="x2~nA$2#vj{~DeifX2[B"></arg>
    	</mutation>
		<field name="NAME">isMarketOpen</field>
	</block>
</category>
<category name="Time" colour="%{BKY_COLOUR_HUE}">
	<block type="variables_get_now" id="3"></block>
</category>
<category name="Utilities2" colour="%{BKY_TEXTS_HUE}">
	<block type="field_order" id="1"></block>
	<block type="field_tick" id="2"></block>
</category>
</xml>`;
