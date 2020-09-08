import React from 'react';
import * as Styled from './ViewRaw.style';

const ViewRaw: React.FC<{ data: any }> = ({ data }) => <Styled.RawView>{JSON.stringify(data, null, 2)}</Styled.RawView>;

export default ViewRaw;
