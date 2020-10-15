package com.jsopena.inventario.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.jsopena.inventario.web.rest.TestUtil;

public class TrasteroLayoutTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrasteroLayout.class);
        TrasteroLayout trasteroLayout1 = new TrasteroLayout();
        trasteroLayout1.setId(1L);
        TrasteroLayout trasteroLayout2 = new TrasteroLayout();
        trasteroLayout2.setId(trasteroLayout1.getId());
        assertThat(trasteroLayout1).isEqualTo(trasteroLayout2);
        trasteroLayout2.setId(2L);
        assertThat(trasteroLayout1).isNotEqualTo(trasteroLayout2);
        trasteroLayout1.setId(null);
        assertThat(trasteroLayout1).isNotEqualTo(trasteroLayout2);
    }
}
